import fs from 'fs'
import path from 'path'
import { AttributifyConfig, Pattern } from './types/types'

const defaultConfig: Required<AttributifyConfig> = {
  prefix: 'attr_',
  presets: [] as (Pattern[] | (() => Pattern[]))[],
  themes: {},
  defaultTheme: 'default'
}

let cachedConfig: Required<AttributifyConfig> | null = null

const processPresets = (presets: (Pattern[] | (() => Pattern[]))[]): (Pattern[] | (() => Pattern[]))[] => {
  return presets.map(preset => {
    if (typeof preset === 'function') {
      return preset()
    }
    return preset
  }) as (Pattern[] | (() => Pattern[]))[]
}

export function loadConfig(cwd: string): Required<AttributifyConfig> {
  if (cachedConfig) {
    return cachedConfig
  }

  const configPath = path.resolve(cwd, 'attributify.config.js')

  if (fs.existsSync(configPath)) {
    try {
      delete require.cache[configPath]
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const userConfig = require(configPath) as AttributifyConfig

      cachedConfig = {
        prefix: userConfig.prefix || defaultConfig.prefix,
        presets: processPresets(userConfig.presets),
        themes: userConfig.themes || defaultConfig.themes,
        defaultTheme: userConfig.defaultTheme || defaultConfig.defaultTheme
      }

      return cachedConfig
    } catch (error) {
      console.warn(`Error while reading config file: ${configPath}`, error)
    }
  }

  cachedConfig = defaultConfig
  return cachedConfig
}
