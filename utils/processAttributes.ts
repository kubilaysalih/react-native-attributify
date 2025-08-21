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

    if (attr.value) {
      if (types.isStringLiteral(attr.value)) {
        value = attr.value.value
      } else if (types.isJSXExpressionContainer(attr.value) &&
                 types.isStringLiteral(attr.value.expression)) {
        value = attr.value.expression.value
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
            // Resolve theme variables for non-theme-variant values
            const resolvedValue = value ? resolveThemeVariable(value, 'light') : ''

            const style = typeof handler === 'function'
              ? handler([name, resolvedValue])
              : handler

            Object.assign(newStyles, style)
            processedAttrs.add(attr)
          }
        } else if (matcher instanceof RegExp) {
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

    if (attr.value) {
      if (types.isStringLiteral(attr.value)) {
        value = attr.value.value
      } else if (types.isJSXExpressionContainer(attr.value) &&
                 types.isStringLiteral(attr.value.expression)) {
        value = attr.value.expression.value
      }
    }

    for (const [matcher, handler] of patterns) {
      if (typeof matcher === 'string') {
        if (name === matcher) {
          // Resolve theme variables for non-theme-variant values
          const resolvedValue = value ? resolveThemeVariable(value, 'light') : ''

          const style = typeof handler === 'function'
            ? handler([name, resolvedValue])
            : handler

          Object.assign(newStyles, style)
          processedAttrs.add(attr)
        }
      } else if (matcher instanceof RegExp) {
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
