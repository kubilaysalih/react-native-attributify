import { NodePath, types as t } from '@babel/core'

export const checkStyleSheetExistence = (path: NodePath<t.Program>): boolean => {
  let hasStyleSheetComponent = false

  path.traverse({
    CallExpression(callPath) {
      if (
        t.isMemberExpression(callPath.node.callee) &&
        t.isIdentifier(callPath.node.callee.property) &&
        callPath.node.callee.property.name === 'create' &&
        t.isMemberExpression(callPath.node.callee.object) &&
        t.isIdentifier(callPath.node.callee.object.property) &&
        callPath.node.callee.object.property.name === 'StyleSheet'
      ) {
        hasStyleSheetComponent = true
      }
    }
  })

  return hasStyleSheetComponent
}