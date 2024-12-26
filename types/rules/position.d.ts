export type JustifyContentValue =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

export type JustifyShortValue = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'

export type AlignItemsValue =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'

export type AlignItemsShortValue = 'start' | 'end' | 'center' | 'baseline' | 'stretch'

export interface PositionStyle {
  'justify'?: JustifyShortValue
  'justify-content'?: JustifyContentValue
  'justify-start'?: boolean
  'justify-end'?: boolean
  'justify-center'?: boolean
  'justify-between'?: boolean
  'justify-around'?: boolean
  'justify-evenly'?: boolean

  'items'?: AlignItemsShortValue
  'align-items'?: AlignItemsValue
  'items-start'?: boolean
  'items-end'?: boolean
  'items-center'?: boolean
  'items-baseline'?: boolean
  'items-stretch'?: boolean
}