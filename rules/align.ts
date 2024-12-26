import { Pattern } from '../types/types'

export const textAlignValues = ['center', 'left', 'right', 'justify', 'start', 'end'] as const

export const isTextAlignValue = (value: string): boolean => {
  return textAlignValues.includes(value as typeof textAlignValues[number])
}

const verticalAlignAlias: Record<string, string> = {
  'mid': 'middle',
  'base': 'baseline',
  'btm': 'bottom',
  'baseline': 'baseline',
  'top': 'top',
  'start': 'top',
  'middle': 'middle',
  'bottom': 'bottom',
  'end': 'bottom',
  'text-top': 'text-top',
  'text-bottom': 'text-bottom',
  'sub': 'sub',
  'super': 'super'
}

const align: Pattern[] = [
  ['text-center', { textAlign: 'center' }],
  ['text-left', { textAlign: 'left' }],
  ['text-right', { textAlign: 'right' }],
  ['text-justify', { textAlign: 'justify' }],
  ['text-start', { textAlign: 'start' }],
  ['text-end', { textAlign: 'end' }],

  [/^(?:vertical|align|v)-([a-z-]+)$/, ([, v]) => ({
    verticalAlign: verticalAlignAlias[v] || v
  })]
]

export default align