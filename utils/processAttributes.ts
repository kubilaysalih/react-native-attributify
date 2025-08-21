import { types as t } from '@babel/core'
import { Pattern, StyleObject, AttributifyConfig } from '../types/types'
import { parseThemeVariants, hasThemeVariants, shouldUseAutoThemeVariants } from './themeProcessor'
import { resolveThemeVariable } from './themeVariableResolver'
import { detectAutoThemeVariants } from './autoThemeVariantDetector'

export const processThemeAwareAttributes = (
  attributes: t.JSXAttribute[],
  types: typeof t,
  patterns: Pattern[],
  config?: AttributifyConfig
): { styles: StyleObject; conditionalStyles: Record<string, t.Expression> } => {
  const newStyles: StyleObject = {}
  const conditionalStyles: Record<string, t.Expression> = {}
  const processedAttrs = new Set<t.JSXAttribute>()

  for (const attr of attributes) {
    if (!types.isJSXAttribute(attr) || !types.isJSXIdentifier(attr.name)) {
      continue
    }

    const name = attr.name.name
    let value: string | null = null
    let variableExpression: t.Expression | null = null

    if (attr.value) {
      if (types.isStringLiteral(attr.value)) {
        value = attr.value.value
      } else if (types.isJSXExpressionContainer(attr.value)) {
        if (types.isStringLiteral(attr.value.expression)) {
          value = attr.value.expression.value
        } else if (types.isNumericLiteral(attr.value.expression)) {
          value = attr.value.expression.value.toString()
        } else if (types.isIdentifier(attr.value.expression)) {
          // Handle variables - store the variable expression for later use
          variableExpression = attr.value.expression
          value = '__VARIABLE__' // Special marker to indicate this is a variable
        }
      }
    }

    // Check for theme variants
    if (value && hasThemeVariants(value)) {
      const variants = parseThemeVariants(value)
      const defaultVariant = variants.find(v => v.theme === 'default')
      const themeVariants = variants.filter(v => v.theme !== 'default')

      if (themeVariants.length > 0) {
        // Create conditional expression for theme-aware styling
        for (const [matcher, handler] of patterns) {
          if (typeof matcher === 'string' && name === matcher) {
            // Get default style with resolved theme variables
            const defaultValue = defaultVariant?.value || themeVariants[0].value
            const resolvedDefaultValue = resolveThemeVariable(defaultValue, 'light') // Use light as default theme
            const defaultStyle = typeof handler === 'function'
              ? handler([name, resolvedDefaultValue])
              : handler

            // Create theme-based conditional expressions
            Object.keys(defaultStyle).forEach(styleKey => {
              const defaultValue = defaultStyle[styleKey]

              // Build conditional expression for each theme
              let conditionalExpr: t.Expression = typeof defaultValue === 'string'
                ? types.stringLiteral(defaultValue)
                : types.numericLiteral(defaultValue as number)

              // Create nested conditional expressions for multiple themes
              for (const variant of [...themeVariants].reverse()) {
                // Resolve theme variables for this variant
                const resolvedValue = resolveThemeVariable(variant.value, variant.theme)

                const themeStyle = typeof handler === 'function'
                  ? handler([name, resolvedValue])
                  : handler

                const themeValue = themeStyle[styleKey] || defaultValue

                conditionalExpr = types.conditionalExpression(
                  types.binaryExpression(
                    '===',
                    types.identifier('theme'),
                    types.stringLiteral(variant.theme)
                  ),
                  typeof themeValue === 'string'
                    ? types.stringLiteral(themeValue)
                    : types.numericLiteral(themeValue as number),
                  conditionalExpr
                )
              }

              conditionalStyles[styleKey] = conditionalExpr
            })

            processedAttrs.add(attr)
            break
          }
        }
      } else if (defaultVariant) {
        // No theme variants, just use default
        for (const [matcher, handler] of patterns) {
          if (typeof matcher === 'string' && name === matcher) {
            const style = typeof handler === 'function'
              ? handler([name, defaultVariant.value])
              : handler

            Object.assign(newStyles, style)
            processedAttrs.add(attr)
            break
          }
        }
      }
    } else if (value && config && shouldUseAutoThemeVariants(value, config)) {
      // Handle automatic theme variants (values that exist in multiple themes)
      const autoVariants = detectAutoThemeVariants(value, config)

      if (autoVariants.hasMultipleThemes) {
        for (const [matcher, handler] of patterns) {
          if (typeof matcher === 'string' && name === matcher) {
            // Get the default theme variant (first one, usually 'default' or 'light')
            const defaultVariant = autoVariants.variants.find(v => v.theme === 'default') || autoVariants.variants[0]
            const otherVariants = autoVariants.variants.filter(v => v.theme !== defaultVariant.theme)

            // Create default style
            const defaultStyle = typeof handler === 'function'
              ? handler([name, defaultVariant.value])
              : handler

            // Create theme-based conditional expressions
            Object.keys(defaultStyle).forEach(styleKey => {
              const defaultValue = defaultStyle[styleKey]

              // Build conditional expression for each theme
              let conditionalExpr: t.Expression = typeof defaultValue === 'string'
                ? types.stringLiteral(defaultValue)
                : types.numericLiteral(defaultValue as number)

              // Create nested conditional expressions for multiple themes
              for (const variant of [...otherVariants].reverse()) {
                const themeStyle = typeof handler === 'function'
                  ? handler([name, variant.value])
                  : handler

                const themeValue = themeStyle[styleKey] || defaultValue

                conditionalExpr = types.conditionalExpression(
                  types.binaryExpression(
                    '===',
                    types.identifier('theme'),
                    types.stringLiteral(variant.theme)
                  ),
                  typeof themeValue === 'string'
                    ? types.stringLiteral(themeValue)
                    : types.numericLiteral(themeValue as number),
                  conditionalExpr
                )
              }

              conditionalStyles[styleKey] = conditionalExpr
            })

            processedAttrs.add(attr)
            break
          }
        }
      }
    } else {
      // No theme variants, process normally
      for (const [matcher, handler] of patterns) {
        if (typeof matcher === 'string') {
          if (name === matcher) {
            if (variableExpression) {
              // Handle variable expressions - create conditional styles using the variable
              const style = typeof handler === 'function'
                ? handler([name, '']) // Pass empty string to get the style structure
                : handler

              // For each style property, use the variable expression
              Object.keys(style).forEach(styleKey => {
                conditionalStyles[styleKey] = variableExpression
              })
            } else {
              // Resolve theme variables for non-theme-variant values
              const resolvedValue = value ? resolveThemeVariable(value, 'light') : ''

              const style = typeof handler === 'function'
                ? handler([name, resolvedValue])
                : handler

              Object.assign(newStyles, style)
            }
            processedAttrs.add(attr)
          }
        } else if (matcher instanceof RegExp) {
          if (variableExpression) {
            // For regex patterns with variables, we need to check if the pattern matches the attribute name
            const testString = name
            const match = testString.match(matcher)

            if (match) {
              const style = typeof handler === 'function'
                ? handler([name, '']) // Pass empty string to get the style structure
                : handler

              // For each style property, use the variable expression
              Object.keys(style).forEach(styleKey => {
                conditionalStyles[styleKey] = variableExpression
              })
              processedAttrs.add(attr)
            }
          } else {
            const testString = value ? `${name}="${value}"` : name
            const match = testString.match(matcher)

            if (match) {
              // For regex matches, resolve theme variables in the matched value
              const resolvedMatch = match.map((m, index) => {
                if (index === 0) return m // Keep the full match as is
                return m ? resolveThemeVariable(m, 'light') : m
              })

              const style = typeof handler === 'function'
                ? handler(resolvedMatch)
                : handler

              Object.assign(newStyles, style)
              processedAttrs.add(attr)
            }
          }
        }
      }
    }
  }

  // Remove processed attributes (iterate backwards to avoid index issues)
  for (let i = attributes.length - 1; i >= 0; i--) {
    if (processedAttrs.has(attributes[i])) {
      attributes.splice(i, 1)
    }
  }

  return { styles: newStyles, conditionalStyles }
}

export const processAttributes = (
  attributes: t.JSXAttribute[],
  types: typeof t,
  patterns: Pattern[]
): StyleObject | null => {
  const newStyles: StyleObject = {}
  const processedAttrs = new Set<t.JSXAttribute>()

  for (const attr of attributes) {
    if (!types.isJSXAttribute(attr) || !types.isJSXIdentifier(attr.name)) {
      continue
    }

    const name = attr.name.name
    let value: string | null = null
    let variableExpression: t.Expression | null = null

    if (attr.value) {
      if (types.isStringLiteral(attr.value)) {
        value = attr.value.value
      } else if (types.isJSXExpressionContainer(attr.value)) {
        if (types.isStringLiteral(attr.value.expression)) {
          value = attr.value.expression.value
        } else if (types.isNumericLiteral(attr.value.expression)) {
          value = attr.value.expression.value.toString()
        } else if (types.isIdentifier(attr.value.expression)) {
          // Handle variables - store the variable expression for later use
          variableExpression = attr.value.expression
          value = '__VARIABLE__' // Special marker to indicate this is a variable
        }
      }
    }

    for (const [matcher, handler] of patterns) {
      if (typeof matcher === 'string') {
        if (name === matcher) {
          if (variableExpression) {
            // Handle variable expressions - return the variable as a dynamic style
            const style = typeof handler === 'function'
              ? handler([name, '']) // Pass empty string to get the style structure
              : handler

            // For variables in non-theme-aware context, we need to return the variable expression
            // This will be handled by the calling function to create dynamic styles
            Object.keys(style).forEach(styleKey => {
              newStyles[styleKey] = variableExpression as t.Expression // Store the variable expression
            })
          } else {
            // Resolve theme variables for non-theme-variant values
            const resolvedValue = value ? resolveThemeVariable(value, 'light') : ''

            const style = typeof handler === 'function'
              ? handler([name, resolvedValue])
              : handler

            Object.assign(newStyles, style)
          }
          processedAttrs.add(attr)
        }
      } else if (matcher instanceof RegExp) {
        if (variableExpression) {
          // For regex patterns with variables, check if the pattern matches the attribute name
          const testString = name
          const match = testString.match(matcher)

          if (match) {
            const style = typeof handler === 'function'
              ? handler([name, '']) // Pass empty string to get the style structure
              : handler

            // For variables, store the variable expression
            Object.keys(style).forEach(styleKey => {
              newStyles[styleKey] = variableExpression as t.Expression
            })
            processedAttrs.add(attr)
          }
        } else {
          const testString = value ? `${name}="${value}"` : name
          const match = testString.match(matcher)

          if (match) {
            // For regex matches, resolve theme variables in the matched value
            const resolvedMatch = match.map((m, index) => {
              if (index === 0) return m // Keep the full match as is
              return m ? resolveThemeVariable(m, 'light') : m
            })

            const style = typeof handler === 'function'
              ? handler(resolvedMatch)
              : handler

            Object.assign(newStyles, style)
            processedAttrs.add(attr)
          }
        }
      }
    }
  }

  if (Object.keys(newStyles).length > 0) {
    attributes.forEach((attr, index) => {
      if (processedAttrs.has(attr)) {
        attributes.splice(index, 1)
      }
    })
    return newStyles
  }

  return null
}
