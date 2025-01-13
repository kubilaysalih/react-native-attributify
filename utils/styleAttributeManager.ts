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
