import { PluginObj, NodePath, types as t, PluginPass } from '@babel/core'
import { loadConfig } from './config'
import { StyleObject } from './types/types'
import { checkStyleSheetExistence } from './utils/checkStyleSheetExistence'
import { extractRelativePath } from './utils/extractRelativePath'
import { generateStyleSheet } from './utils/generateStyleSheet'
import { initializePatterns } from './utils/initializePatterns'
import { ensureStyleSheetImport } from './utils/processImports'
import { processJSXElements } from './utils/processJSXElements'

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