export type BorderStyleValue = 'solid' | 'dashed' | 'dotted' | 'double' | 'none'

export type BorderWidthValue = number | string

export type BorderPropValue = string | number | BorderWidthValue

export interface BorderStyle {
  border?: BorderPropValue
  b?: BorderPropValue
  'border-width'?: BorderWidthValue
  'border-style'?: BorderStyleValue
  'border-color'?: string

  bt?: BorderPropValue
  br?: BorderPropValue
  bb?: BorderPropValue
  bl?: BorderPropValue
  'border-t'?: BorderPropValue
  'border-r'?: BorderPropValue
  'border-b'?: BorderPropValue
  'border-l'?: BorderPropValue

  rd?: BorderPropValue
  'border-radius'?: BorderPropValue
  'rounded-t'?: BorderPropValue
  'rounded-r'?: BorderPropValue
  'rounded-b'?: BorderPropValue
  'rounded-l'?: BorderPropValue
}
