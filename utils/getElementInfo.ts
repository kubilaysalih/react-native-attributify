import { ElementInfo } from '../types/types'
import { types as t } from '@babel/core'

export const getElementInfo = (
  node: t.JSXElement,
  types: typeof t
): ElementInfo => {
  const openingElement = node.openingElement
  const attributes = openingElement.attributes.filter(
    (attr): attr is t.JSXAttribute => types.isJSXAttribute(attr)
  )
  return { openingElement, attributes }
}