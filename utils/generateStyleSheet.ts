import { types as t, types } from '@babel/core'
import { StyleObject } from '../types/types'

export function generateStyleSheet(
  styles: Record<string, StyleObject>,
  styleSheetName: string,
  t: typeof types
): t.VariableDeclaration {
  const styleProperties = Object.entries(styles).map(([key, value]) =>
    t.objectProperty(
      t.identifier(key),
      t.objectExpression(
        Object.entries(value).map(([k, v]) =>
          t.objectProperty(
            t.identifier(k),
            typeof v === 'string'
              ? t.stringLiteral(v)
              : t.numericLiteral(Number(v))
          )
        )
      )
    )
  )

  return t.variableDeclaration('const', [
    t.variableDeclarator(
      t.identifier(styleSheetName),
      t.callExpression(
        t.memberExpression(
          t.identifier('StyleSheet'),
          t.identifier('create')
        ),
        [t.objectExpression(styleProperties)]
      )
    )
  ])
}