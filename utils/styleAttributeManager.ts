import { types as t } from '@babel/core'
import { findExistingStyleAttr } from './findExistingStyleAttr'

export const manageStyleAttribute = (
  attributes: t.JSXAttribute[],
  combinedStyleExpr: t.ObjectExpression,
  types: typeof t,
  openingElement: t.JSXOpeningElement
): void => {
  const existingStyleAttr = findExistingStyleAttr(attributes, types)

  if (existingStyleAttr) {
    updateExistingStyleAttr(existingStyleAttr, combinedStyleExpr, types)
  } else {
    createNewStyleAttr(openingElement, combinedStyleExpr, types)
  }
}

const updateExistingStyleAttr = (
  existingStyleAttr: t.JSXAttribute,
  combinedStyleExpr: t.ObjectExpression,
  types: typeof t
): void => {
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
}

const createNewStyleAttr = (
  openingElement: t.JSXOpeningElement,
  combinedStyleExpr: t.ObjectExpression,
  types: typeof t
): void => {
  openingElement.attributes.push(
    types.jsxAttribute(
      types.jsxIdentifier('style'),
      types.jsxExpressionContainer(combinedStyleExpr)
    )
  )
}