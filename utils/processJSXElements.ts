import { NodePath, types as t } from '@babel/core'
import { StyleObject, Pattern } from '../types/types'
import { processJSXDevProps } from './processJSXDevProps'
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
    CallExpression(callPath) {
      if (
        !types.isMemberExpression(callPath.node.callee) ||
        !types.isIdentifier(callPath.node.callee.property, { name: 'jsxDEV' })
      ) {
        return
      }

      const propsArg = callPath.node.arguments[1]
      if (!types.isObjectExpression(propsArg)) return

      const attributes = propsArg.properties
        .filter((prop): prop is t.ObjectProperty =>
          types.isObjectProperty(prop) &&
          types.isIdentifier(prop.key) &&
          prop.key.name !== 'children'
        )

      const newStyles = processJSXDevProps(attributes, types, patterns)
      if (!newStyles) return

      const styleId = generateStyleHash(newStyles, prefix)
      styles[styleId] = newStyles

      const styleExpr = types.memberExpression(
        types.identifier(styleSheetName),
        types.identifier(styleId)
      )

      const styleProperty = propsArg.properties.find(
        prop => types.isObjectProperty(prop) &&
          types.isIdentifier(prop.key, { name: 'style' })
      )

      if (styleProperty && types.isObjectProperty(styleProperty)) {
        if (types.isObjectExpression(styleProperty.value)) {
          styleProperty.value = types.objectExpression([
            ...styleProperty.value.properties,
            types.spreadElement(styleExpr)
          ])
        } else {
          styleProperty.value = styleExpr
        }
      } else {
        propsArg.properties.push(
          types.objectProperty(
            types.identifier('style'),
            styleExpr
          )
        )
      }
    },

    JSXElement(elementPath: NodePath<t.JSXElement>) {
      if (!types.isJSXElement(elementPath.node)) return

      const openingElement = elementPath.node.openingElement
      const attributes = openingElement.attributes.filter(
        (attr): attr is t.JSXAttribute => types.isJSXAttribute(attr)
      )

      const newStyles = processAttributes(attributes, types, patterns)
      if (!newStyles) return

      const styleId = generateStyleHash(newStyles, prefix)
      styles[styleId] = newStyles

      const styleExpr = types.memberExpression(
        types.identifier(styleSheetName),
        types.identifier(styleId)
      )

      openingElement.attributes = [
        ...openingElement.attributes,
        types.jsxAttribute(
          types.jsxIdentifier('style'),
          types.jsxExpressionContainer(styleExpr)
        )
      ]
    }
  })
}