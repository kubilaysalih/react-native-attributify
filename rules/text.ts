
import { Pattern, StyleObject, StyleValue } from '../types/types'

const weightMap: Record<string, string> = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900'
}

const parseFontSize = (value: string): StyleValue => {
  if (value.endsWith('px')) {
    return Number(value.slice(0, -2))
  }
  if (value.endsWith('rem')) {
    return value
  }
  if (value.endsWith('em')) {
    return value
  }
  return Number(value)
}

const parseTextStyle = (value: string): StyleObject => {
  const parts = value.split(' ')
  const styles: StyleObject = {}

  parts.forEach((part) => {
    if (part.match(/^[0-9]+(?:px|rem|em)?$/)) {
      styles.fontSize = parseFontSize(part)
      return
    }

    if (weightMap[part]) {
      styles.fontWeight = weightMap[part]
      return
    }

    if (part.startsWith('lh-')) {
      const lineHeight = part.substring(3)
      styles.lineHeight = Number(lineHeight)
      return
    }

    if (part === 'italic') {
      styles.fontStyle = 'italic'
      return
    }

    if (part.match(/^(#|rgb|rgba)/) || /^[a-zA-Z]+$/.test(part)) {
      if (part !== 'italic') {
        styles.color = part
      }
      return
    }
  })

  return styles
}

const text: Pattern[] = [
  ['text', ([, value]): StyleObject => {
    if (!value) return {}
    return parseTextStyle(value)
  }]
]

export default text