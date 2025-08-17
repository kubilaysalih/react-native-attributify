import { Pattern, StyleObject } from '../types/types'

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

const parseFontStyle = (value: string): StyleObject => {
  const parts = value.split(' ')
  const styles: StyleObject = {}

  parts.forEach((part) => {
    // Font weight parsing
    if (weightMap[part]) {
      styles.fontWeight = weightMap[part]
      return
    }

    // Font style parsing
    if (part === 'italic') {
      styles.fontStyle = 'italic'
      return
    }

    if (part === 'normal') {
      styles.fontStyle = 'normal'
      return
    }

    // Font family parsing
    if (part.startsWith('family-')) {
      const fontFamily = part.substring(7).replace(/-/g, ' ')
      styles.fontFamily = fontFamily
      return
    }
  })

  return styles
}

const font: Pattern[] = [
  // Font weight
  ['font-weight', ([, value]): StyleObject => {
    if (!value) return {}
    if (weightMap[value]) {
      return { fontWeight: weightMap[value] }
    }
    return { fontWeight: value }
  }],

  // Font style
  ['font-style', ([, value]): StyleObject => {
    if (!value) return {}
    return { fontStyle: value }
  }],

  // Font family
  ['font-family', ([, value]): StyleObject => {
    if (!value) return {}
    const fontFamily = value.replace(/-/g, ' ')
    return { fontFamily }
  }],

  // Combined font properties (weight, style, family)
  ['font', ([, value]): StyleObject => {
    if (!value) return {}
    return parseFontStyle(value)
  }],

  // Font weight shortcuts
  ['font-thin', (): StyleObject => ({ fontWeight: '100' })],
  ['font-extralight', (): StyleObject => ({ fontWeight: '200' })],
  ['font-light', (): StyleObject => ({ fontWeight: '300' })],
  ['font-normal', (): StyleObject => ({ fontWeight: '400' })],
  ['font-medium', (): StyleObject => ({ fontWeight: '500' })],
  ['font-semibold', (): StyleObject => ({ fontWeight: '600' })],
  ['font-bold', (): StyleObject => ({ fontWeight: '700' })],
  ['font-extrabold', (): StyleObject => ({ fontWeight: '800' })],
  ['font-black', (): StyleObject => ({ fontWeight: '900' })],

  // Font style shortcuts
  ['font-italic', (): StyleObject => ({ fontStyle: 'italic' })]
]

export default font
