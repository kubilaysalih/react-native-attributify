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

  // Border radius patterns - dynamic values supported
  r?: BorderPropValue
  [key: `r-${number}`]: BorderPropValue
  [key: `r${number}`]: BorderPropValue
  [key: `rt-${number}`]: BorderPropValue
  [key: `rt${number}`]: BorderPropValue
  [key: `rr-${number}`]: BorderPropValue
  [key: `rr${number}`]: BorderPropValue
  [key: `rb-${number}`]: BorderPropValue
  [key: `rb${number}`]: BorderPropValue
  [key: `rl-${number}`]: BorderPropValue
  [key: `rl${number}`]: BorderPropValue
}
