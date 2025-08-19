export type FontWeightValue =
  | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  | 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'

export type FontStyleValue = 'normal' | 'italic'

export type FontFamilyValue = string

export interface FontStyle {
  'font-weight'?: FontWeightValue
  'font-style'?: FontStyleValue
  'font-family'?: FontFamilyValue
  'font'?: FontWeightValue | FontStyleValue | string
  'font-thin'?: ''
  'font-extralight'?: ''
  'font-light'?: ''
  'font-normal'?: ''
  'font-medium'?: ''
  'font-semibold'?: ''
  'font-bold'?: ''
  'font-extrabold'?: ''
  'font-black'?: ''
  'font-italic'?: ''
}
