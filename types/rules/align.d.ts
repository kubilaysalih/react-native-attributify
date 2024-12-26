export type TextAlignValue = 'center' | 'left' | 'right' | 'justify' | 'start' | 'end'

export type VerticalAlignValue = 'middle' | 'baseline' | 'bottom' | 'top' | 'text-top' | 'text-bottom' | 'sub' | 'super'

export interface AlignStyle {
  'text-center'?: boolean
  'text-left'?: boolean
  'text-right'?: boolean
  'text-justify'?: boolean
  'text-start'?: boolean
  'text-end'?: boolean
  'text-align'?: TextAlignValue
  'vertical-align'?: VerticalAlignValue
  align?: VerticalAlignValue
  vertical?: VerticalAlignValue
  v?: VerticalAlignValue
}