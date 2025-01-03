import { types as t } from '@babel/core'

export const findExistingStyleAttr = (
  attributes: t.JSXAttribute[],
  types: typeof t
): t.JSXAttribute | undefined => {
  return attributes.find(
    attr => types.isJSXAttribute(attr) &&
      types.isJSXIdentifier(attr.name) &&
      attr.name.name === 'style'
  )
}