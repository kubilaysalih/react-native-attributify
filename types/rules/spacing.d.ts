export type SpacingValue =
  | number
  | string
  | `${number}dp`
  | `${number}%`
  | `${number}vw`
  | `${number}vh`
  | `-${number}dp`
  | `-${number}%`
  | `-${number}vw`
  | `-${number}vh`

export type SpacingDirection = 'x' | 'y' | 't' | 'b' | 'l' | 'r'

export type SpacingString = string | number | SpacingValue

export interface SpacingStyle {
  p?: SpacingString
  pt?: SpacingString
  pr?: SpacingString
  pb?: SpacingString
  pl?: SpacingString
  px?: SpacingString
  py?: SpacingString
  padding?: SpacingString
  'padding-top'?: SpacingString
  'padding-right'?: SpacingString
  'padding-bottom'?: SpacingString
  'padding-left'?: SpacingString
  'padding-x'?: SpacingString
  'padding-y'?: SpacingString

  m?: SpacingString
  mt?: SpacingString
  mr?: SpacingString
  mb?: SpacingString
  ml?: SpacingString
  mx?: SpacingString
  my?: SpacingString
  margin?: SpacingString
  'margin-top'?: SpacingString
  'margin-right'?: SpacingString
  'margin-bottom'?: SpacingString
  'margin-left'?: SpacingString
  'margin-x'?: SpacingString
  'margin-y'?: SpacingString
}
