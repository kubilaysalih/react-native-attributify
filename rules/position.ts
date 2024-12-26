/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pattern, StyleObject, StyleValue } from '../types/types'

const positions: Pattern[] = [
  [/^justify="(start|end|center|between|around|evenly)"$/, ([_, value]) => {
    if (!value || value.trim() === '') {
      console.error('Invalid justify value:', value)
      return {} as StyleObject
    }

    const justifyMap: { [key: string]: StyleValue } = {
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'between': 'space-between',
      'around': 'space-around',
      'evenly': 'space-evenly'
    }

    return { justifyContent: justifyMap[value] || 'flex-start' }
  }],

  [/^items="(start|end|center|baseline|stretch)"$/, ([_, value]) => {
    const alignMap: { [key: string]: StyleValue } = {
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'baseline': 'baseline',
      'stretch': 'stretch'
    }

    return { alignItems: alignMap[value] || 'stretch' }
  }],

  ['justify-start', { justifyContent: 'flex-start' }],
  ['justify-end', { justifyContent: 'flex-end' }],
  ['justify-center', { justifyContent: 'center' }],
  ['justify-between', { justifyContent: 'space-between' }],
  ['justify-around', { justifyContent: 'space-around' }],
  ['justify-evenly', { justifyContent: 'space-evenly' }],

  ['items-start', { alignItems: 'flex-start' }],
  ['items-end', { alignItems: 'flex-end' }],
  ['items-center', { alignItems: 'center' }],
  ['items-baseline', { alignItems: 'baseline' }],
  ['items-stretch', { alignItems: 'stretch' }]
]

export default positions