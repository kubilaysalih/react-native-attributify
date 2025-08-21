
import { AttributifyConfig } from '../types/types'
import { ThemeVariant } from './themeProcessor'

export interface AutoThemeVariantResult {
  hasMultipleThemes: boolean
  variants: ThemeVariant[]
}

/**
 * Detects if a value exists as a key in multiple themes and generates automatic theme variants
 */
export function detectAutoThemeVariants(
  value: string,
  config: AttributifyConfig
): AutoThemeVariantResult {
  const result: AutoThemeVariantResult = {
    hasMultipleThemes: false,
    variants: []
  }

  if (!config.themes || !value || typeof value !== 'string') {
    return result
  }

  // Skip if value already contains theme prefixes
  if (value.includes(':')) {
    return result
  }

  // Skip if it's a direct color value
  if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('hsl')) {
    return result
  }

  const foundThemes: string[] = []

  // Check each theme to see if this value exists as a key
  for (const [themeName, themeConfig] of Object.entries(config.themes)) {
    if (!themeConfig || typeof themeConfig !== 'object') continue

    // Check if value exists in colors
    if (themeConfig.colors && typeof themeConfig.colors === 'object') {
      if (themeConfig.colors[value]) {
        foundThemes.push(themeName)
        result.variants.push({
          theme: themeName,
          value: themeConfig.colors[value]
        })
      }
    }

    // Also check if value exists with colors. prefix
    const colorKey = value.startsWith('colors.') ? value.replace('colors.', '') : null
    if (colorKey && themeConfig.colors && themeConfig.colors[colorKey]) {
      foundThemes.push(themeName)
      result.variants.push({
        theme: themeName,
        value: themeConfig.colors[colorKey]
      })
    }
  }

  // Only consider it a multi-theme value if it exists in more than one theme
  result.hasMultipleThemes = foundThemes.length > 1

  return result
}
