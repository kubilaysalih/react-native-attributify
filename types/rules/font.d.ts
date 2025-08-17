export type FontWeightValue =
  | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  | 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'

export type FontStyleValue = 'normal' | 'italic'

export type FontFamilyValue = string

export interface FontStyle {
  'font-weight'?: FontWeightValue
  'font-style'?: FontStyleValue
  'font-family'?: FontFamilyValue
  'font'?: string
  'font-thin'?: boolean
  'font-extralight'?: boolean
  'font-light'?: boolean
  'font-normal'?: boolean
  'font-medium'?: boolean
  'font-semibold'?: boolean
  'font-bold'?: boolean
  'font-extrabold'?: boolean
  'font-black'?: boolean
  'font-italic'?: boolean
}
