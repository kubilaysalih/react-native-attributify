// Temel değerler
export type FlexDirectionValue = 'row' | 'row-reverse' | 'column' | 'column-reverse'
export type FlexWrapValue = 'wrap' | 'wrap-reverse' | 'nowrap'
export type FlexBasisValue = number | string | 'auto'
export type FlexGrowShrinkValue = number | string

// Justify Content değerleri
export type JustifyContentValue =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

export type JustifyContentShortValue =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'justify-center'
  | 'justify-start'
  | 'justify-end'
  | 'justify-between'
  | 'justify-around'
  | 'justify-evenly'

export type AlignItemsValue =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'

export type AlignItemsShortValue =
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch'
  | 'align-center'
  | 'align-start'
  | 'align-end'
  | 'align-baseline'
  | 'align-stretch'

export type FlexPropValue =
  | number
  | string
  | 'auto'
  | 'none'
  | 'initial'
  | JustifyContentShortValue
  | AlignItemsShortValue
  | FlexDirectionValue
  | FlexWrapValue
  | `${JustifyContentShortValue} ${AlignItemsShortValue}`
  | `${AlignItemsShortValue} ${JustifyContentShortValue}`
  | `${string} ${JustifyContentShortValue}`
  | `${string} ${AlignItemsShortValue}`
  | `${JustifyContentShortValue} ${string}`
  | `${AlignItemsShortValue} ${string}`
  | `${AlignItemsShortValue} ${JustifyContentShortValue} ${string}`
  | `${JustifyContentShortValue} ${AlignItemsShortValue} ${string}`

export interface FlexStyle {
  flex?: FlexPropValue
  'flex-1'?: boolean
  'flex-auto'?: boolean
  'flex-initial'?: boolean
  'flex-none'?: boolean
  'flex-row'?: boolean
  'flex-row-reverse'?: boolean
  'flex-col'?: boolean
  'flex-col-reverse'?: boolean
  'flex-wrap'?: boolean
  'flex-wrap-reverse'?: boolean
  'flex-nowrap'?: boolean
  'flex-grow'?: FlexGrowShrinkValue
  'flex-shrink'?: FlexGrowShrinkValue
  'flex-basis'?: FlexBasisValue
  'grow'?: FlexGrowShrinkValue
  'shrink'?: FlexGrowShrinkValue
  'basis'?: FlexBasisValue
}