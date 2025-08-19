import { NodePath, types as t } from '@babel/core'

export const ensureThemeImport = (path: NodePath<t.Program>, types: typeof t): void => {
  // Check if useTheme is already imported
  const hasThemeImport = path.node.body.some(node => {
    if (types.isImportDeclaration(node)) {
      return node.specifiers.some(spec => {
        if (types.isImportSpecifier(spec) && types.isIdentifier(spec.imported)) {
          return spec.imported.name === 'useTheme'
        }
        return false
      })
    }
    return false
  })

  if (!hasThemeImport) {
    // Add import { useTheme } from 'react-native-attributify/theme'
    const themeImport = types.importDeclaration(
      [types.importSpecifier(types.identifier('useTheme'), types.identifier('useTheme'))],
      types.stringLiteral('react-native-attributify/theme')
    )

    // Find the last import statement
    const lastImportIndex = path.node.body.reduce((index, node, currentIndex) =>
      types.isImportDeclaration(node) ? currentIndex : index,
      -1
    )

    // Insert the theme import after the last import
    if (lastImportIndex >= 0) {
      path.node.body.splice(lastImportIndex + 1, 0, themeImport)
    } else {
      // If no imports exist, add at the beginning
      path.node.body.unshift(themeImport)
    }
  }
}
