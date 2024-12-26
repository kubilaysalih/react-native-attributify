export type TextDecorationLineValue = 'none' | 'underline' | 'line-through'

export type TextDecorationStyleValue = 'solid' | 'double' | 'dotted' | 'dashed'

export type FontSizeValue = number | string

export interface DecorationStyle {
  'text-decoration-line'?: TextDecorationLineValue
  'text-decoration-style'?: TextDecorationStyleValue
  'text-decoration-color'?: string
  'font-size'?: FontSizeValue
  'text-color'?: string
}