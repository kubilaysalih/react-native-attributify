export type FontSizeValue = number | string

export type FontWeightValue =
  | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  | 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'

export type ColorValue = string

export type LineHeightValue = number | string

export interface TextStyle {
  text?: string
}