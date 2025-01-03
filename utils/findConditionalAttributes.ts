import { types as t } from '@babel/core'

export const findConditionalAttributes = (
  attributes: t.JSXAttribute[],
  types: typeof t
): t.JSXAttribute[] => {
  return attributes.filter(attr =>
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
}