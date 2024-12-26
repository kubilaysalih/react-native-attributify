/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pattern, StyleObject } from '../types/types'
import { isTextAlignValue } from './align'

const isValidColorValue = (value: string): boolean => {
  if (!value || value.trim() === '') return false

  if (value.startsWith('#') && /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(value)) return true

  if (value.startsWith('rgb') || value.startsWith('rgba')) {
    const matches = value.match(/^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([0-9.]+))?\)$/)
    if (matches) {
      const [_, r, g, b, a] = matches
      const rgb = [r, g, b].map(Number)
      if (rgb.some(v => v < 0 || v > 255)) return false
      if (a !== undefined && (Number(a) < 0 || Number(a) > 1)) return false
      return true
    }
    return false
  }

  if (/^hsl(a)?\([\d\s,%]+\)$/.test(value)) return true

  if (/^[a-z]+-([0-9]|[1-9][0-9]|100)$/.test(value)) return true

  if (/^[a-z]+$/i.test(value)) return true

  return false
}

const color: Pattern[] = [
  ['text', ([, value]): StyleObject => {
    if (!value) return {} as StyleObject
    const styles = {} as StyleObject
    const values: string[] = value.toLowerCase().trim().split(/\s+/)

    values.forEach(val => {
      if (isTextAlignValue(val)) {
        styles.textAlign = val
      } else if (isValidColorValue(val)) {
        styles.color = val
      }
    })

    return styles
  }],

  [/^text-([a-z][a-z0-9-]*)$/, ([, color]): StyleObject => {
    if (isTextAlignValue(color) || !isValidColorValue(color)) return {} as StyleObject
    return { color }
  }],

  [/^bg-([a-z][a-z0-9-]*)$/, ([, color]): StyleObject =>
    isValidColorValue(color) ? { backgroundColor: color } : ({} as StyleObject)
  ],

  ['bg', ([, value]): StyleObject =>
    value && isValidColorValue(value) ? { backgroundColor: value } : ({} as StyleObject)
  ],

  [/^opacity-(\d+)$/, ([, value]): StyleObject => ({
    opacity: Number(value) / 100
  })],

  [/^op-(\d+)$/, ([, value]): StyleObject => ({
    opacity: Number(value) / 100
  })]
]

export default color