/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleValue, StyleObject, Pattern } from '../types/types'

const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'none']

const parseBorderValue = (value: string): StyleValue => {
  const num = Number(value)
  if (!isNaN(num)) {
    return num
  }

  if (/^-?\d+(\.\d+)?(px|rem|em)$/.test(value)) {
    return value
  }

  return value
}

const parseBorderString = (value: string): StyleObject => {
  const parts = value.split(' ')
  const styles: StyleObject = {}

  parts.forEach(part => {
    if (part === 'rounded') {
      styles.borderRadius = 4
      return
    }

    if (borderStyles.includes(part)) {
      styles.borderStyle = part
      return
    }

    if (part.startsWith('#') || part.startsWith('rgb') || part.startsWith('rgba')) {
      styles.borderColor = part
      return
    }

    const width = parseBorderValue(part)
    if (width) {
      styles.borderWidth = width
    }
  })

  return styles
}

const borders: Pattern[] = [
  [/^(?:border|b)="([^"]+)"$/, ([_, value]): StyleObject => {
    return parseBorderString(value)
  }],

  [/^(?:border|b)([trbl])="([^"]+)"$/, ([_, dir, value]): StyleObject => {
    const styles = parseBorderString(value)
    const directionStyles: StyleObject = {}

    Object.entries(styles).forEach(([key, val]) => {
      switch(dir) {
        case 't':
          if (key === 'borderRadius') {
            directionStyles.borderTopLeftRadius = val
            directionStyles.borderTopRightRadius = val
          } else {
            directionStyles[`border${key.slice(6)}Top`] = val
          }
          break
        case 'r':
          if (key === 'borderRadius') {
            directionStyles.borderTopRightRadius = val
            directionStyles.borderBottomRightRadius = val
          } else {
            directionStyles[`border${key.slice(6)}Right`] = val
          }
          break
        case 'b':
          if (key === 'borderRadius') {
            directionStyles.borderBottomLeftRadius = val
            directionStyles.borderBottomRightRadius = val
          } else {
            directionStyles[`border${key.slice(6)}Bottom`] = val
          }
          break
        case 'l':
          if (key === 'borderRadius') {
            directionStyles.borderTopLeftRadius = val
            directionStyles.borderBottomLeftRadius = val
          } else {
            directionStyles[`border${key.slice(6)}Left`] = val
          }
          break
      }
    })

    return directionStyles
  }],

  ['border', { borderWidth: 1 }],
  ['b', { borderWidth: 1 }],

  ['rounded', { borderRadius: 4 }],
  ['rd', { borderRadius: 4 }],

  ...borderStyles.map(style => ([
    `border-${style}`,
    { borderStyle: style }
  ])) as Pattern[],
  ...borderStyles.map(style => ([
    `b-${style}`,
    { borderStyle: style }
  ])) as Pattern[]
]

export default borders