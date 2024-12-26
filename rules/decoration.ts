/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pattern, StyleObject, StyleValue } from '../types/types'

const decorationStyles = ['solid', 'double', 'dotted', 'dashed']
const lineStyles = ['none', 'underline', 'line-through'] as const

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
  let isDecorationContext = false

  parts.forEach((part) => {
    if (part === 'decoration') {
      isDecorationContext = true
      return
    }

    if (part.match(/^[0-9]+(?:px|rem|em)?$/)) {
      styles.fontSize = parseFontSize(part)
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (lineStyles.includes(part as any)) {
      styles.textDecorationLine = part
      return
    }

    if (decorationStyles.includes(part)) {
      styles.textDecorationStyle = part
      return
    }

    if (part.match(/^(#|rgb|rgba)/) || /^[a-zA-Z]+$/.test(part)) {
      if (isDecorationContext || styles.textDecorationLine) {
        styles.textDecorationColor = part
      } else {
        styles.color = part
      }
      return
    }
  })

  return styles
}

const textDecorations: Pattern[] = [
  [/^text="([^"]+)"$/, ([_, value]): StyleObject => parseTextStyle(value)]
]

export default textDecorations