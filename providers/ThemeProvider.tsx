// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Appearance } from 'react-native'

export interface ThemeContextType {
  theme: string
  setTheme: (theme: string) => void
  availableThemes: string[]
}

export interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: string
  themes?: string[]
  followSystemTheme?: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  themes = ['light', 'dark'],
  followSystemTheme = true
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<string>(defaultTheme)

  useEffect(() => {
    if (followSystemTheme) {
      const systemTheme = Appearance.getColorScheme()
      if (systemTheme && themes.includes(systemTheme)) {
        setThemeState(systemTheme)
      }

      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        if (colorScheme && themes.includes(colorScheme)) {
          setThemeState(colorScheme)
        }
      })

      return () => subscription?.remove()
    }
  }, [followSystemTheme, themes])

  const setTheme = (newTheme: string) => {
    if (themes.includes(newTheme)) {
      setThemeState(newTheme)
    }
  }

  const value: ThemeContextType = {
    theme,
    setTheme,
    availableThemes: themes
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { ThemeContext }
