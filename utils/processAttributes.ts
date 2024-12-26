import { types as t } from '@babel/core'
import { Pattern, StyleObject } from '../types/types'

export const processAttributes = (
  attributes: t.JSXAttribute[],
  types: typeof t,
  patterns: Pattern[]
): StyleObject | null => {
  const newStyles: StyleObject = {}
  const processedAttrs = new Set<t.JSXAttribute>()

  for (const attr of attributes) {
    if (!types.isJSXAttribute(attr) || !types.isJSXIdentifier(attr.name)) {
      continue
    }

    const name = attr.name.name
    let value: string | null = null

    if (attr.value) {
      if (types.isStringLiteral(attr.value)) {
        value = attr.value.value
      } else if (types.isJSXExpressionContainer(attr.value) &&
                 types.isStringLiteral(attr.value.expression)) {
        value = attr.value.expression.value
      }
    }

    for (const [matcher, handler] of patterns) {
      if (typeof matcher === 'string') {
        if (name === matcher) {
          const style = typeof handler === 'function'
            ? handler([name, value || ''])
            : handler

          Object.assign(newStyles, style)
          processedAttrs.add(attr)
        }
      } else if (matcher instanceof RegExp) {
        const testString = value ? `${name}="${value}"` : name
        const match = testString.match(matcher)

        if (match) {
          const style = typeof handler === 'function'
            ? handler(match)
            : handler

          Object.assign(newStyles, style)
          processedAttrs.add(attr)
        }
      }
    }
  }

  if (Object.keys(newStyles).length > 0) {
    attributes.forEach((attr, index) => {
      if (processedAttrs.has(attr)) {
        attributes.splice(index, 1)
      }
    })
    return newStyles
  }

  return null
}