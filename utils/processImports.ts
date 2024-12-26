import { NodePath, types as t, types } from '@babel/core'

export const ensureStyleSheetImport = (
  path: NodePath<t.Program>,
  t: typeof types
): boolean => {
  const hasStyleSheetImport = path.node.body.some(node =>
    t.isImportDeclaration(node) &&
    node.source.value === 'react-native' &&
    node.specifiers.some(spec =>
      t.isImportSpecifier(spec) &&
      t.isIdentifier(spec.imported) &&
      spec.imported.name === 'StyleSheet'
    )
  )

  if (!hasStyleSheetImport) {
    path.node.body.unshift(
      t.importDeclaration(
        [t.importSpecifier(t.identifier('StyleSheet'), t.identifier('StyleSheet'))],
        t.stringLiteral('react-native')
      )
    )

    return true
  }

  return false
}