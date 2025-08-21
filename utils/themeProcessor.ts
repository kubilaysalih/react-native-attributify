/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleObject, AttributifyConfig } from '../types/types'
import { detectAutoThemeVariants } from './autoThemeVariantDetector'

export interface ThemeVariant {
  theme: string
  value: string
}

export function parseThemeVariants(value: string): ThemeVariant[] {
  const variants: ThemeVariant[] = []
  const parts = value.split(/\s+/)

  for (const part of parts) {
    if (part.includes(':')) {
      const [theme, themeValue] = part.split(':')
      if (theme && themeValue) {
        variants.push({ theme, value: themeValue })
      }
    } else {
      // Default theme (no prefix)
      variants.push({ theme: 'default', value: part })
    }
  }

  return variants
}

export function hasThemeVariants(value: string): boolean {
  return value.includes(':')
}

export function createThemeAwareStyle(
  baseStyle: StyleObject,
  themeVariants: ThemeVariant[],
  currentTheme: string
): StyleObject {
  // Find the appropriate variant for current theme
  const themeVariant = themeVariants.find(v => v.theme === currentTheme)
  const defaultVariant = themeVariants.find(v => v.theme === 'default')

  // Use theme-specific variant if available, otherwise fall back to default
  const selectedVariant = themeVariant || defaultVariant

  if (!selectedVariant) {
    return baseStyle
  }

  return { ...baseStyle }
}

export function generateThemeConditionalExpression(
  themeVariants: ThemeVariant[],
  styleProperty: string,
  types: any
): any {
  if (themeVariants.length === 0) return null

  // Sort variants to prioritize default theme first
  const sortedVariants = [...themeVariants].sort((a, b) => {
    if (a.theme === 'default') return -1
    if (b.theme === 'default') return 1
    return 0
  })

  // Build nested conditional expressions for multiple themes
  let conditionalExpr = types.stringLiteral(sortedVariants[0].value)

  for (let i = 1; i < sortedVariants.length; i++) {
    const variant = sortedVariants[i]

    // Create condition: theme === 'themeName'
    const condition = types.binaryExpression(
      '===',
      types.identifier('theme'),
      types.stringLiteral(variant.theme)
    )

    // Create conditional: theme === 'themeName' ? themeValue : previousExpression
    conditionalExpr = types.conditionalExpression(
      condition,
      types.stringLiteral(variant.value),
      conditionalExpr
    )
  }

  return conditionalExpr
}

/**
 * Processes a value and automatically generates theme variants if the value exists in multiple themes
 */
export function processAutoThemeVariants(
  value: string,
  config: AttributifyConfig,
  types: any
): any | null {
  const autoVariants = detectAutoThemeVariants(value, config)

  if (!autoVariants.hasMultipleThemes) {
    return null
  }

  return generateThemeConditionalExpression(autoVariants.variants, '', types)
}

/**
 * Checks if a value should be processed with automatic theme variants
 */
export function shouldUseAutoThemeVariants(value: string, config: AttributifyConfig): boolean {
  const autoVariants = detectAutoThemeVariants(value, config)
  return autoVariants.hasMultipleThemes
}
