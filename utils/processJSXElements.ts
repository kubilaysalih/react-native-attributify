import { NodePath, types as t } from '@babel/core'
import { processTemplateLiteral } from './templateLiteralProcessor'
import { processConditionalExpression } from './conditionalExpressionProcessor'
import { manageStyleAttribute } from './styleAttributeManager'
import { processAttributes } from './processAttributes'
import { generateStyleHash } from './generateStyleHash'
import { Pattern, StyleObject } from '../types/types'
import { findConditionalAttributes } from './findConditionalAttributes'
import { getElementInfo } from './getElementInfo'

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

      const { openingElement, attributes } = getElementInfo(elementPath.node, types)
      const conditionalAttrs = findConditionalAttributes(attributes, types)

      if (conditionalAttrs.length > 0) {
        let combinedStyleExpr = types.objectExpression([])

        for (const attr of conditionalAttrs) {
          if (!types.isJSXIdentifier(attr.name)) continue
          const attrName = attr.name.name
          const attrValue = attr.value

          if (!types.isJSXExpressionContainer(attrValue)) continue
          const expression = attrValue.expression

          if (types.isTemplateLiteral(expression)) {
            combinedStyleExpr = processTemplateLiteral(
              expression,
              attrName,
              patterns,
              types,
              combinedStyleExpr
            )
          } else if (types.isConditionalExpression(expression)) {
            const conditionalStyle = processConditionalExpression(
              expression,
              attrName,
              patterns,
              types
            )
            if (conditionalStyle) {
              combinedStyleExpr.properties.push(...conditionalStyle.properties)
            }
          }

          const attrIndex = attributes.indexOf(attr)
          if (attrIndex > -1) {
            attributes.splice(attrIndex, 1)
          }
        }

        if (combinedStyleExpr.properties.length > 0) {
          manageStyleAttribute(attributes, combinedStyleExpr, types, openingElement)
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

      manageStyleAttribute(attributes, styleExpr, types, openingElement)
    }
  })
}