import { NodePath, types as t } from '@babel/core'
import { processTemplateLiteral } from './templateLiteralProcessor'
import { processConditionalExpression } from './conditionalExpressionProcessor'
import { manageStyleAttribute } from './styleAttributeManager'
import { processAttributes, processThemeAwareAttributes } from './processAttributes'
import { generateStyleHash } from './generateStyleHash'
import { Pattern, StyleObject, AttributifyConfig } from '../types/types'
import { findConditionalAttributes } from './findConditionalAttributes'
import { getElementInfo } from './getElementInfo'
import { hasThemeVariants, shouldUseAutoThemeVariants } from './themeProcessor'

export const processJSXElements = (
  path: NodePath<t.Program>,
  patterns: Pattern[],
  styles: Record<string, StyleObject>,
  styleSheetName: string,
  types: typeof t,
  prefix: string,
  config?: AttributifyConfig
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

      // Check if any attributes have theme variants or automatic theme variants
      const hasThemeAttributes = attributes.some(attr => {
        if (!types.isJSXAttribute(attr) || !types.isJSXIdentifier(attr.name)) return false

        let value: string | null = null
        if (attr.value) {
          if (types.isStringLiteral(attr.value)) {
            value = attr.value.value
          } else if (types.isJSXExpressionContainer(attr.value) &&
                     types.isStringLiteral(attr.value.expression)) {
            value = attr.value.expression.value
          }
        }

        if (!value) return false

        // Check for explicit theme variants (dark:value syntax)
        if (hasThemeVariants(value)) return true

        // Check for automatic theme variants (values that exist in multiple themes)
        if (config && shouldUseAutoThemeVariants(value, config)) return true

        return false
      })

      if (hasThemeAttributes) {
        // Process theme-aware attributes
        const { styles: staticStyles, conditionalStyles } = processThemeAwareAttributes(
          attributes,
          types,
          patterns,
          config
        )

        // Create a function that returns dynamic styles based on theme
        const styleProperties: t.ObjectProperty[] = []

        // Add static styles
        Object.entries(staticStyles).forEach(([key, value]) => {
          styleProperties.push(
            types.objectProperty(
              types.identifier(key),
              typeof value === 'string'
                ? types.stringLiteral(value)
                : types.numericLiteral(value as number)
            )
          )
        })

        // Add conditional styles that depend on theme
        Object.entries(conditionalStyles).forEach(([key, expression]) => {
          styleProperties.push(
            types.objectProperty(
              types.identifier(key),
              expression
            )
          )
        })

        if (styleProperties.length > 0) {
          // Create a dynamic style object that will be evaluated at runtime
          const dynamicStyleExpr = types.objectExpression(styleProperties)
          manageStyleAttribute(attributes, dynamicStyleExpr, types, openingElement)
        }
      } else {
        // Process normally without theme awareness
        const newStyles = processAttributes(attributes, types, patterns)
        if (!newStyles) return

        // Check if any styles contain variable expressions
        const hasVariables = Object.values(newStyles).some(value =>
          value && typeof value === 'object' && 'type' in value
        )

        if (hasVariables) {
          // Handle dynamic styles with variables
          const styleProperties: t.ObjectProperty[] = []

          Object.entries(newStyles).forEach(([key, value]) => {
            if (value && typeof value === 'object' && 'type' in value) {
              // This is a variable expression
              styleProperties.push(
                types.objectProperty(
                  types.identifier(key),
                  value as t.Expression
                )
              )
            } else {
              // This is a static value
              styleProperties.push(
                types.objectProperty(
                  types.identifier(key),
                  typeof value === 'string'
                    ? types.stringLiteral(value)
                    : types.numericLiteral(value as number)
                )
              )
            }
          })

          const dynamicStyleExpr = types.objectExpression(styleProperties)
          manageStyleAttribute(attributes, dynamicStyleExpr, types, openingElement)
        } else {
          // Handle static styles normally
          const styleId = generateStyleHash(newStyles, prefix)
          styles[styleId] = newStyles

          const styleExpr = types.memberExpression(
            types.identifier(styleSheetName),
            types.identifier(styleId)
          )

          manageStyleAttribute(attributes, styleExpr, types, openingElement)
        }
      }
    }
  })
}
