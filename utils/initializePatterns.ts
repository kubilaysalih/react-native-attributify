import { AttributifyConfig, StyleHandler, StylePattern } from '../types/types'

export const initializePatterns = (config: AttributifyConfig): StylePattern[] => {
  const patterns: StylePattern[] = []

  if (config.presets?.length) {
    const flattenedPresets = config.presets.flat(2)

    for (let i = 0; i < flattenedPresets.length; i += 2) {
      const matcher = flattenedPresets[i]
      const handler = flattenedPresets[i + 1]

      if ((typeof matcher === 'string' || matcher instanceof RegExp) &&
          (typeof handler === 'function' || typeof handler === 'object')) {
        const styleHandler = handler as StyleHandler
        patterns.push([matcher, styleHandler])
      }
    }
  }

  return patterns
}