import { types as t } from '@babel/core'
import { Pattern, StyleObject } from '../types/types'

export const processJSXDevProps = (
  properties: t.ObjectProperty[],
  types: typeof t,
  patterns: Pattern[]
): StyleObject | null => {
  const newStyles: StyleObject = {}
  const processedProps = new Set<t.ObjectProperty>()

  for (const prop of properties) {
    if (!types.isIdentifier(prop.key) || prop.key.name === 'style') {
      continue
    }

    const name = prop.key.name
    let value: string | null = null

    if (types.isStringLiteral(prop.value)) {
      value = prop.value.value
    }

    for (const [matcher, handler] of patterns) {
      if (typeof matcher === 'string') {
        if (name === matcher) {
          const style = typeof handler === 'function'
            ? handler([name, value || ''])
            : handler

          Object.assign(newStyles, style)
          processedProps.add(prop)
        }
      } else if (matcher instanceof RegExp) {
        const testString = value ? `${name}="${value}"` : name
        const match = testString.match(matcher)

        if (match) {
          const style = typeof handler === 'function'
            ? handler(match)
            : handler

          Object.assign(newStyles, style)
          processedProps.add(prop)
        }
      }
    }
  }

  if (Object.keys(newStyles).length > 0) {
    properties.forEach((prop, index) => {
      if (processedProps.has(prop)) {
        properties.splice(index, 1)
      }
    })
    return newStyles
  }

  return null
}