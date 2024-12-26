export type SizeValue =
  | number
  | 'full'
  | 'screen'
  | 'half'
  | 'auto'
  | `${number}%`
  | `${number}px`
  | `${number}rem`
  | `${number}em`

export type AspectRatioValue =
  | number
  | 'square'
  | 'video'
  | `${number}/${number}`

export interface SizeStyle {
  'w'?: SizeValue
  'min-w'?: SizeValue
  'max-w'?: SizeValue
  'width'?: SizeValue
  'min-width'?: SizeValue
  'max-width'?: SizeValue

  'h'?: SizeValue
  'min-h'?: SizeValue
  'max-h'?: SizeValue
  'height'?: SizeValue
  'min-height'?: SizeValue
  'max-height'?: SizeValue

  'size'?: SizeValue | `${SizeValue} ${SizeValue}` | `${SizeValue} x ${SizeValue}`

  'aspect'?: AspectRatioValue
  'aspect-ratio'?: number
}
