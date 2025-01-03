import { NodePath, types as t } from '@babel/core'
import { StyleObject, Pattern } from '../types/types'
import { processAttributes } from './processAttributes'
import { generateStyleHash } from './generateStyleHash'

export const processJSXElements = (
  path: NodePath<t.Program>,
  patterns: Pattern[],
  styles: Record<string, StyleObject>,
  styleSheetName: string,
  types: typeof t,
  prefix: string
): void => {
  path.traverse({
    JSXElement(elementPath: NodePath<t.JSXElement>) {
      if (!types.isJSXElement(elementPath.node)) return

      const openingElement = elementPath.node.openingElement
      const attributes = openingElement.attributes.filter(
        (attr): attr is t.JSXAttribute => types.isJSXAttribute(attr)
      )

      const conditionalAttrs = attributes.filter(attr =>
        types.isJSXAttribute(attr) &&
        types.isJSXIdentifier(attr.name) &&
        attr.value &&
        types.isJSXExpressionContainer(attr.value) &&
        attr.value.expression &&
        (
          types.isConditionalExpression(attr.value.expression) ||
          types.isTemplateLiteral(attr.value.expression)
        )
      )

      if (conditionalAttrs.length > 0) {
        let combinedStyleExpr = types.objectExpression([])

        for (const attr of conditionalAttrs) {
          if (!types.isJSXIdentifier(attr.name)) continue
          const attrName = attr.name.name
          const attrValue = attr.value

          if (!types.isJSXExpressionContainer(attrValue)) continue
          const expression = attrValue.expression

          if (types.isTemplateLiteral(expression)) {
            const values = expression.quasis.map(q => q.value.raw.trim()).filter(Boolean)
            const dynamicExpressions = expression.expressions

            for (const [matcher, handler] of patterns) {
              if (typeof matcher === 'string' && attrName === matcher) {
                const fullValue = values.reduce((acc, val, index) => {
                  const dynamicPart = dynamicExpressions[index]
                    ? (types.isConditionalExpression(dynamicExpressions[index])
                      ? (dynamicExpressions[index] as t.ConditionalExpression)
                      : null)
                    : null

                  return acc + val + (dynamicPart ? ' ' : '')
                }, '')

                if (typeof handler === 'function') {
                  dynamicExpressions.forEach(expr => {
                    if (types.isConditionalExpression(expr)) {
                      const consequentStyle = types.isStringLiteral(expr.consequent)
                        ? handler([attrName, `${fullValue} ${expr.consequent.value}`])
                        : {}

                      const alternateStyle = types.isStringLiteral(expr.alternate)
                        ? handler([attrName, `${fullValue} ${expr.alternate.value}`])
                        : {}

                      const styleKeys = [...new Set([
                        ...Object.keys(consequentStyle),
                        ...Object.keys(alternateStyle)
                      ])]

                      styleKeys.forEach(key => {
                        const consequentValue = consequentStyle[key]
                        const alternateValue = alternateStyle[key]

                        if (consequentValue && alternateValue) {
                          combinedStyleExpr.properties.push(
                            types.objectProperty(
                              types.stringLiteral(key),
                              types.conditionalExpression(
                                expr.test,
                                typeof consequentValue === 'number'
                                  ? types.numericLiteral(consequentValue)
                                  : types.stringLiteral(consequentValue),
                                typeof alternateValue === 'number'
                                  ? types.numericLiteral(alternateValue)
                                  : types.stringLiteral(alternateValue)
                              )
                            )
                          )
                        }
                      })
                    }
                  })
                }
              }
            }
          }
          else if (types.isConditionalExpression(expression)) {
            for (const [matcher, handler] of patterns) {
              const matchesPattern = typeof matcher === 'string'
                ? attrName === matcher
                : matcher.test(`${attrName}=""`)

              if (matchesPattern) {
                let consequentStyle: Record<string, string | number> = {}
                let alternateStyle: Record<string, string | number> = {}

                if (types.isStringLiteral(expression.consequent)) {
                  if (typeof handler === 'function') {
                    consequentStyle = handler([attrName, expression.consequent.value])
                  }
                }

                if (types.isStringLiteral(expression.alternate)) {
                  if (typeof handler === 'function') {
                    alternateStyle = handler([attrName, expression.alternate.value])
                  }
                }

                const styleKeys = [...new Set([
                  ...Object.keys(consequentStyle),
                  ...Object.keys(alternateStyle)
                ])]

                if (styleKeys.length > 0) {
                  const styleProperties = styleKeys.map(key => {
                    if (!key) return null

                    const consequentValue = consequentStyle[key]
                    const alternateValue = alternateStyle[key]

                    if (typeof consequentValue === 'number' && typeof alternateValue === 'number') {
                      return types.objectProperty(
                        types.stringLiteral(key),
                        types.conditionalExpression(
                          expression.test,
                          types.numericLiteral(consequentValue),
                          types.numericLiteral(alternateValue)
                        )
                      )
                    }

                    if (typeof consequentValue === 'string' && typeof alternateValue === 'string') {
                      return types.objectProperty(
                        types.stringLiteral(key),
                        types.conditionalExpression(
                          expression.test,
                          types.stringLiteral(consequentValue),
                          types.stringLiteral(alternateValue)
                        )
                      )
                    }

                    return null
                  }).filter((prop): prop is t.ObjectProperty => prop !== null)

                  if (styleProperties.length) {
                    const styleExpr = types.objectExpression(styleProperties)
                    combinedStyleExpr = types.objectExpression([
                      ...combinedStyleExpr.properties,
                      types.spreadElement(styleExpr)
                    ])
                  }
                }
              }
            }
          }

          const attrIndex = attributes.indexOf(attr)
          if (attrIndex > -1) {
            attributes.splice(attrIndex, 1)
          }
        }

        if (combinedStyleExpr.properties.length > 0) {
          const existingStyleAttr = attributes.find(
            attr => types.isJSXAttribute(attr) &&
              types.isJSXIdentifier(attr.name) &&
              attr.name.name === 'style'
          )

          if (existingStyleAttr && types.isJSXAttribute(existingStyleAttr)) {
            if (existingStyleAttr.value &&
              types.isJSXExpressionContainer(existingStyleAttr.value)) {
              const expr = existingStyleAttr.value.expression
              if (!types.isJSXEmptyExpression(expr)) {
                combinedStyleExpr = types.objectExpression([
                  types.spreadElement(expr as t.Expression),
                  ...combinedStyleExpr.properties
                ])
              }
            }
            existingStyleAttr.value = types.jsxExpressionContainer(combinedStyleExpr)
          } else {
            openingElement.attributes.push(
              types.jsxAttribute(
                types.jsxIdentifier('style'),
                types.jsxExpressionContainer(combinedStyleExpr)
              )
            )
          }
          return
        }
      }

      const newStyles = processAttributes(attributes, types, patterns)
      if (!newStyles) return

      const styleId = generateStyleHash(newStyles, prefix)
      styles[styleId] = newStyles

      const styleExpr = types.memberExpression(
        types.identifier(styleSheetName),
        types.identifier(styleId)
      )

      const existingStyleAttr = attributes.find(
        attr => types.isJSXAttribute(attr) &&
          types.isJSXIdentifier(attr.name) &&
          attr.name.name === 'style'
      )

      if (existingStyleAttr && types.isJSXAttribute(existingStyleAttr)) {
        if (existingStyleAttr.value &&
          types.isJSXExpressionContainer(existingStyleAttr.value)) {
          const expr = existingStyleAttr.value.expression
          if (!types.isJSXEmptyExpression(expr)) {
            existingStyleAttr.value = types.jsxExpressionContainer(
              types.arrayExpression([
                expr as t.Expression,
                styleExpr
              ])
            )
          }
        }
      } else {
        openingElement.attributes.push(
          types.jsxAttribute(
            types.jsxIdentifier('style'),
            types.jsxExpressionContainer(styleExpr)
          )
        )
      }
    }
  })
}