/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleObject } from '../types/types'

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

  // For now, we'll focus on dark/light theme support
  const lightVariant = themeVariants.find(v => v.theme === 'light' || v.theme === 'default')
  const darkVariant = themeVariants.find(v => v.theme === 'dark')

  if (!lightVariant && !darkVariant) return null

  const lightValue = lightVariant?.value || ''
  const darkValue = darkVariant?.value || lightValue

  // Create conditional expression: isDark ? darkValue : lightValue
  return types.conditionalExpression(
    types.memberExpression(
      types.identifier('theme'),
      types.identifier('isDark')
    ),
    types.stringLiteral(darkValue),
    types.stringLiteral(lightValue)
  )
}
