export type GapValue = number | string

export type JustifyContentValue =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'

export type AlignItemsValue =
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch'

export type FlexDirectionValue =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse'

export type FlexWrapValue =
  | 'wrap'
  | 'wrap-reverse'
  | 'nowrap'

export type FlexNumberValue =
  | number
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'

export interface FlexStyle {
  flex?: string;

  direction?: FlexDirectionValue;

  wrap?: FlexWrapValue;

  justify?: JustifyContentValue;
  'justify-content'?: JustifyContentValue;

  items?: AlignItemsValue;
  'align-items'?: AlignItemsValue;

  grow?: FlexNumberValue;
  shrink?: FlexNumberValue;
  basis?: FlexNumberValue | 'auto';

  gap?: GapValue;
  'gap-x'?: GapValue;
  'gap-y'?: GapValue;
  'column-gap'?: GapValue;
  'row-gap'?: GapValue;
}
