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

  // Check if useTheme hook is already called and if theme is destructured
  let existingUseThemeStatement = null
  let hasThemeVariable = false

  body.body.forEach(statement => {
    if (types.isVariableDeclaration(statement)) {
      statement.declarations.forEach(declarator => {
        if (types.isVariableDeclarator(declarator) && declarator.init) {
          // Check if the init is a call to useTheme()
          if (types.isCallExpression(declarator.init) &&
              types.isIdentifier(declarator.init.callee) &&
              declarator.init.callee.name === 'useTheme') {
            existingUseThemeStatement = statement

            // Check if theme is already destructured
            if (types.isObjectPattern(declarator.id)) {
              hasThemeVariable = declarator.id.properties.some(prop => {
                if (types.isObjectProperty(prop) && types.isIdentifier(prop.key)) {
                  return prop.key.name === 'theme'
                }
                return false
              })
            }
          }
        }
      })
    }
  })

  if (existingUseThemeStatement && !hasThemeVariable) {
    // Add theme to existing useTheme destructuring
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const declaration = existingUseThemeStatement as any
    const declarator = declaration.declarations[0]
    if (types.isVariableDeclarator(declarator) && types.isObjectPattern(declarator.id)) {
      // Add theme property to existing destructuring
      declarator.id.properties.push(
        types.objectProperty(
          types.identifier('theme'),
          types.identifier('theme')
        )
      )
    }
  } else if (!existingUseThemeStatement) {
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
