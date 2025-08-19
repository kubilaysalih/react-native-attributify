import { loadConfig } from '../config'

export interface ThemeVariableResolver {
  resolveThemeVariable: (variable: string, theme: string) => string
}

export const createThemeVariableResolver = (): ThemeVariableResolver => {
  const config = loadConfig(process.cwd())

  const resolveThemeVariable = (variable: string, theme: string): string => {
    // If it's not a theme variable, return as is
    if (!variable || typeof variable !== 'string') {
      return variable
    }

    // Check if it's a direct color value (hex, rgb, etc.)
    if (variable.startsWith('#') || variable.startsWith('rgb') || variable.startsWith('hsl')) {
      return variable
    }

    // Check if it's a theme variable
    const themeConfig = config.themes?.[theme]
    if (!themeConfig) {
      return variable // Return original if theme not found
    }

    // Handle colors.primary format
    if (variable.startsWith('colors.')) {
      const colorKey = variable.replace('colors.', '')
      const colorValue = themeConfig.colors?.[colorKey]
      return colorValue || variable
    }

    // Handle direct color key (primary, secondary, etc.)
    if (themeConfig.colors?.[variable]) {
      return themeConfig.colors[variable]
    }

    // If no match found, return original value
    return variable
  }

  return { resolveThemeVariable }
}

// Global resolver instance
let globalResolver: ThemeVariableResolver | null = null

export const getThemeVariableResolver = (): ThemeVariableResolver => {
  if (!globalResolver) {
    globalResolver = createThemeVariableResolver()
  }
  return globalResolver
}

export const resolveThemeVariable = (variable: string, theme: string): string => {
  const resolver = getThemeVariableResolver()
  return resolver.resolveThemeVariable(variable, theme)
}
