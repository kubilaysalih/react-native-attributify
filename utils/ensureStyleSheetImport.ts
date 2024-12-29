import { NodePath, types as t } from '@babel/core'

export const ensureStyleSheetImport = (
  path: NodePath<t.Program>,
  types: typeof t
): boolean => {
  const hasStyleSheetImport = path.node.body.some(node =>
    types.isImportDeclaration(node) &&
    node.source.value === 'react-native' &&
    node.specifiers.some(spec =>
      types.isImportSpecifier(spec) &&
      types.isIdentifier(spec.imported) &&
      spec.imported.name === 'StyleSheet'
    )
  )

  if (!hasStyleSheetImport) {
    path.node.body.unshift(
      types.importDeclaration(
        [types.importSpecifier(types.identifier('StyleSheet'), types.identifier('StyleSheet'))],
        types.stringLiteral('react-native')
      )
    )
    return true
  }

  return false
}