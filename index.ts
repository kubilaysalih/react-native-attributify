import { PluginObj, NodePath, types as t, PluginPass } from '@babel/core'
import { loadConfig } from './config'
import { StyleObject } from './types/types'
import { checkStyleSheetExistence } from './utils/checkStyleSheetExistence'
import { extractRelativePath } from './utils/extractRelativePath'
import { generateStyleSheet } from './utils/generateStyleSheet'
import { initializePatterns } from './utils/initializePatterns'
import { ensureStyleSheetImport } from './utils/ensureStyleSheetImport'
import { ensureThemeImport } from './utils/ensureThemeImport'
import { addThemeHookToComponent } from './utils/addThemeHookToComponent'
import { processJSXElements } from './utils/processJSXElements'
import { hasThemeVariants } from './utils/themeProcessor'

export default function (): PluginObj {
  const config = loadConfig(process.cwd())
  const prefix = config.prefix
  const patterns = initializePatterns(config)

  return {
    name: 'babel-plugin-react-native-attributify',
    visitor: {
      Program(path: NodePath<t.Program>, state: PluginPass) {
        if (patterns.length === 0) return

        const filename = state.filename || 'unknown'
        const projectRoot = process.cwd()
        const relativePath = extractRelativePath(filename, projectRoot)
        const styleSheetName = `${prefix}${relativePath.replace(/[^a-zA-Z0-9]/g, '_')}`
        const styles: Record<string, StyleObject> = {}

        if (checkStyleSheetExistence(path)) return

        // Check if any JSX elements use theme variants
        let hasThemeVariantsInFile = false
        path.traverse({
          JSXAttribute(attrPath) {
            if (!t.isJSXIdentifier(attrPath.node.name)) return

            let value: string | null = null
            if (attrPath.node.value) {
              if (t.isStringLiteral(attrPath.node.value)) {
                value = attrPath.node.value.value
              } else if (t.isJSXExpressionContainer(attrPath.node.value) &&
                         t.isStringLiteral(attrPath.node.value.expression)) {
                value = attrPath.node.value.expression.value
              }
            }

            if (value && hasThemeVariants(value)) {
              hasThemeVariantsInFile = true
            }
          }
        })

        // If theme variants are used, ensure useTheme is imported and add theme hook
        if (hasThemeVariantsInFile) {
          ensureThemeImport(path, t)

          // Add useTheme hook call at the beginning of the component
          path.traverse({
            FunctionDeclaration(funcPath) {
              if (funcPath.node.id && funcPath.node.id.name &&
                  funcPath.node.id.name.match(/^[A-Z]/)) { // Component function
                addThemeHookToComponent(funcPath, t)
              }
            },
            ArrowFunctionExpression(funcPath) {
              const parent = funcPath.parent
              if (t.isVariableDeclarator(parent) && t.isIdentifier(parent.id) &&
                  parent.id.name.match(/^[A-Z]/)) { // Component arrow function
                addThemeHookToComponent(funcPath, t)
              }
            }
          })
        }

        processJSXElements(path, patterns, styles, styleSheetName, t, prefix)

        if (Object.keys(styles).length > 0) {
          const styleSheet = generateStyleSheet(styles, styleSheetName, t)
          ensureStyleSheetImport(path, t)

          const lastImportIndex = path.node.body.reduce((index, node, currentIndex) =>
            t.isImportDeclaration(node) ? currentIndex : index,
            -1
          )

          path.node.body.splice(lastImportIndex + 1, 0, styleSheet)
        }
      }
    }
  }
}
