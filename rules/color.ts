/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pattern, StyleObject } from '../types/types'

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
  ['color', ([, value]): StyleObject => {
    if (!value) return {}
    if (isValidColorValue(value)) {
      return { color: value }
    }
    return {}
  }],

  ['text', ([, value]): StyleObject => {
    if (!value) return {}
    if (isValidColorValue(value)) {
      return { color: value }
    }
    return {}
  }],

  ['bg', ([, value]): StyleObject =>
    value && isValidColorValue(value) ? { backgroundColor: value } : {}
  ],

  [/^opacity-(\d+)$/, ([, value]): StyleObject => ({
    opacity: Number(value) / 100
  })],

  [/^op-(\d+)$/, ([, value]): StyleObject => ({
    opacity: Number(value) / 100
  })]
]

export default color