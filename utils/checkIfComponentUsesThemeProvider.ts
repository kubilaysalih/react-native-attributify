import { NodePath, types as t } from '@babel/core'

export const checkIfComponentUsesThemeProvider = (
  funcPath: NodePath<t.FunctionDeclaration | t.ArrowFunctionExpression>,
  types: typeof t
): boolean => {
  let usesThemeProvider = false

  // Traverse the function body to look for ThemeProvider JSX elements
  funcPath.traverse({
    JSXElement(elementPath) {
      if (types.isJSXElement(elementPath.node)) {
        const openingElement = elementPath.node.openingElement
        if (types.isJSXIdentifier(openingElement.name)) {
          if (openingElement.name.name === 'ThemeProvider') {
            usesThemeProvider = true
          }
        }
      }
    }
  })

  return usesThemeProvider
}
