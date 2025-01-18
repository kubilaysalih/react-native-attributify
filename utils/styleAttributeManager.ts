import { types as t } from '@babel/core'
import { findExistingStyleAttr } from './findExistingStyleAttr'

export const manageStyleAttribute = (
  attributes: t.JSXAttribute[],
  newStyle: t.Expression,
  types: typeof t,
  openingElement: t.JSXOpeningElement
): void => {
  const existingStyleAttr = findExistingStyleAttr(attributes, types)

  if (existingStyleAttr) {
    if (existingStyleAttr.value && types.isJSXExpressionContainer(existingStyleAttr.value)) {
      const expr = existingStyleAttr.value.expression
      if (!types.isJSXEmptyExpression(expr)) {
        const arrayExpression = types.arrayExpression([
          expr as t.Expression,
          newStyle
        ])
        existingStyleAttr.value = types.jsxExpressionContainer(arrayExpression)
        return
      }
    }
    existingStyleAttr.value = types.jsxExpressionContainer(newStyle)
  } else {
    openingElement.attributes.push(
      types.jsxAttribute(
        types.jsxIdentifier('style'),
        types.jsxExpressionContainer(newStyle)
      )
    )
  }
}