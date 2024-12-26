export interface ColorStyle {
  text?: string
  'text-color'?: string
  'text-current'?: boolean
  'text-transparent'?: boolean

  bg?: string
  'bg-color'?: string
  'bg-current'?: boolean
  'bg-transparent'?: boolean

  opacity?: string | number
  'op'?: string | number
}

export interface ColorStyleObject {
  'text-color'?: string
  'bg-color'?: string
  'text-align'?: string
  opacity?: number
}