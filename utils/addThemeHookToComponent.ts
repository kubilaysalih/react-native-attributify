import { NodePath, types as t } from '@babel/core'

export const addThemeHookToComponent = (
  funcPath: NodePath<t.FunctionDeclaration | t.ArrowFunctionExpression>,
  types: typeof t
): void => {
  let body: t.BlockStatement

  if (types.isFunctionDeclaration(funcPath.node)) {
    body = funcPath.node.body
  } else if (types.isArrowFunctionExpression(funcPath.node)) {
    if (types.isBlockStatement(funcPath.node.body)) {
      body = funcPath.node.body
    } else {
      // Convert expression body to block statement
      const returnStatement = types.returnStatement(funcPath.node.body)
      body = types.blockStatement([returnStatement])
      funcPath.node.body = body
    }
  } else {
    return
  }

  // Check if useTheme hook is already called
  const hasThemeHook = body.body.some(statement => {
    if (types.isVariableDeclaration(statement)) {
      return statement.declarations.some(declarator => {
        if (types.isVariableDeclarator(declarator) &&
            types.isObjectPattern(declarator.id)) {
          return declarator.id.properties.some(prop => {
            if (types.isObjectProperty(prop) && types.isIdentifier(prop.key)) {
              return prop.key.name === 'theme'
            }
            return false
          })
        }
        return false
      })
    }
    return false
  })

  if (!hasThemeHook) {
    // Add const { theme } = useTheme() at the beginning of the component
    const themeHookCall = types.variableDeclaration('const', [
      types.variableDeclarator(
        types.objectPattern([
          types.objectProperty(
            types.identifier('theme'),
            types.identifier('theme')
          )
        ]),
        types.callExpression(
          types.identifier('useTheme'),
          []
        )
      )
    ])

    // Insert at the beginning of the function body
    body.body.unshift(themeHookCall)
  }
}
