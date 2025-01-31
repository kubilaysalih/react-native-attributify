export type PositionValue =
  | 'absolute'
  | 'relative'
  | 'static'

export type InsetValue = number | string

export interface PositionStyle {
  pos?: PositionValue;
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  z?: number | string;
}
