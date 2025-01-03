import { types as t } from '@babel/core'
import { ConditionalStyles, Pattern, StyleObject } from '../types/types'

export const processConditionalExpression = (
  expression: t.ConditionalExpression,
  attrName: string,
  patterns: Pattern[],
  types: typeof t
): t.ObjectExpression | null => {
  for (const [matcher, handler] of patterns) {
    const matchesPattern = typeof matcher === 'string'
      ? attrName === matcher
      : matcher.test(`${attrName}=""`)

    if (matchesPattern && typeof handler === 'function') {
      const { consequentStyle, alternateStyle } = getConditionalStyles(
        expression,
        attrName,
        handler,
        types
      )

      return createConditionalStyleObject(
        consequentStyle,
        alternateStyle,
        expression.test,
        types
      )
    }
  }
  return null
}

const getConditionalStyles = (
  expression: t.ConditionalExpression,
  attrName: string,
  handler: (args: [string, string]) => StyleObject,
  types: typeof t
): ConditionalStyles => {
  let consequentStyle: StyleObject = {}
  let alternateStyle: StyleObject = {}

  if (types.isStringLiteral(expression.consequent)) {
    consequentStyle = handler([attrName, expression.consequent.value])
  }

  if (types.isStringLiteral(expression.alternate)) {
    alternateStyle = handler([attrName, expression.alternate.value])
  }

  return { consequentStyle, alternateStyle }
}

const createConditionalStyleObject = (
  consequentStyle: StyleObject,
  alternateStyle: StyleObject,
  test: t.Expression,
  types: typeof t
): t.ObjectExpression => {
  const styleKeys = [...new Set([
    ...Object.keys(consequentStyle),
    ...Object.keys(alternateStyle)
  ])]

  const styleProperties = styleKeys
    .map(key => createStyleProperty(
      key,
      consequentStyle[key],
      alternateStyle[key],
      test,
      types
    ))
    .filter((prop): prop is t.ObjectProperty => prop !== null)

  return types.objectExpression(styleProperties)
}

const createStyleProperty = (
  key: string,
  consequentValue: string | number | undefined,
  alternateValue: string | number | undefined,
  test: t.Expression,
  types: typeof t
): t.ObjectProperty | null => {
  if (!key) return null

  if (typeof consequentValue === 'number' && typeof alternateValue === 'number') {
    return types.objectProperty(
      types.stringLiteral(key),
      types.conditionalExpression(
        test,
        types.numericLiteral(consequentValue),
        types.numericLiteral(alternateValue)
      )
    )
  }

  if (typeof consequentValue === 'string' && typeof alternateValue === 'string') {
    return types.objectProperty(
      types.stringLiteral(key),
      types.conditionalExpression(
        test,
        types.stringLiteral(consequentValue),
        types.stringLiteral(alternateValue)
      )
    )
  }

  return null
}