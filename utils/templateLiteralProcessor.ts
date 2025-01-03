import { types as t } from '@babel/core'
import { Pattern, StyleObject } from '../types/types'

export const processTemplateLiteral = (
  expression: t.TemplateLiteral,
  attrName: string,
  patterns: Pattern[],
  types: typeof t,
  combinedStyleExpr: t.ObjectExpression
): t.ObjectExpression => {
  const values = expression.quasis.map(q => q.value.raw.trim()).filter(Boolean)
  const dynamicExpressions = expression.expressions

  for (const [matcher, handler] of patterns) {
    if (typeof matcher === 'string' && attrName === matcher) {
      const fullValue = buildFullValue(values, dynamicExpressions, types)

      if (typeof handler === 'function') {
        dynamicExpressions.forEach(expr => {
          if (types.isConditionalExpression(expr)) {
            combinedStyleExpr = addConditionalProperties(
              expr,
              fullValue,
              handler,
              types,
              combinedStyleExpr
            )
          }
        })
      }
    }
  }

  return combinedStyleExpr
}

const buildFullValue = (
  values: string[],
  dynamicExpressions: Array<t.Expression | t.TSType>,
  types: typeof t
): string => {
  return values.reduce((acc, val, index) => {
    const dynamicPart = dynamicExpressions[index]
      ? (types.isConditionalExpression(dynamicExpressions[index])
        ? dynamicExpressions[index] as t.ConditionalExpression
        : null)
      : null

    return acc + val + (dynamicPart ? ' ' : '')
  }, '')
}

const addConditionalProperties = (
  expr: t.ConditionalExpression,
  fullValue: string,
  handler: (args: [string, string]) => StyleObject,
  types: typeof t,
  combinedStyleExpr: t.ObjectExpression
): t.ObjectExpression => {
  const consequentStyle = types.isStringLiteral(expr.consequent)
    ? handler(['style', `${fullValue} ${expr.consequent.value}`])
    : {}

  const alternateStyle = types.isStringLiteral(expr.alternate)
    ? handler(['style', `${fullValue} ${expr.alternate.value}`])
    : {}

  const styleKeys = [...new Set([
    ...Object.keys(consequentStyle),
    ...Object.keys(alternateStyle)
  ])]

  styleKeys.forEach(key => {
    const consequentValue = consequentStyle[key]
    const alternateValue = alternateStyle[key]

    if (consequentValue && alternateValue) {
      combinedStyleExpr.properties.push(
        types.objectProperty(
          types.stringLiteral(key),
          types.conditionalExpression(
            expr.test,
            typeof consequentValue === 'number'
              ? types.numericLiteral(consequentValue)
              : types.stringLiteral(consequentValue),
            typeof alternateValue === 'number'
              ? types.numericLiteral(alternateValue)
              : types.stringLiteral(alternateValue)
          )
        )
      )
    }
  })

  return combinedStyleExpr
}