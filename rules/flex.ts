/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pattern, StyleObject } from '../types/types'

const flex: Pattern[] = [
  [/^flex="([^"]+)"$/, ([_, value]): StyleObject => {
    if (!value) return {}

    const parts: string[] = value.split(' ')
    const styles: StyleObject = {}

    parts.forEach(part => {
      if (!isNaN(Number(part))) {
        styles.flexGrow = Number(part)
        return
      }

      const specialValues: { [key: string]: StyleObject } = {
        'auto': { flex: '1 1 auto' },
        'none': { flex: 'none' },
        'initial': { flex: '0 1 auto' }
      }

      if (specialValues[part]) {
        Object.assign(styles, specialValues[part])
        return
      }

      const directions: { [key: string]: string } = {
        'row': 'row',
        'row-reverse': 'row-reverse',
        'col': 'column',
        'column': 'column',
        'col-reverse': 'column-reverse',
        'column-reverse': 'column-reverse'
      }

      if (directions[part]) {
        styles.flexDirection = directions[part]
        return
      }

      const wraps: { [key: string]: string } = {
        'wrap': 'wrap',
        'wrap-reverse': 'wrap-reverse',
        'nowrap': 'nowrap'
      }

      if (wraps[part]) {
        styles.flexWrap = wraps[part]
        return
      }

      if (part.startsWith('justify-')) {
        const justifyValue = part.replace('justify-', '')
        const justifyMap: { [key: string]: string } = {
          'start': 'flex-start',
          'end': 'flex-end',
          'center': 'center',
          'between': 'space-between',
          'around': 'space-around',
          'evenly': 'space-evenly'
        }
        if (justifyMap[justifyValue]) {
          styles.justifyContent = justifyMap[justifyValue]
        }
        return
      }

      if (part.startsWith('items-')) {
        const itemsValue = part.replace('items-', '')
        const itemsMap: { [key: string]: string } = {
          'start': 'flex-start',
          'end': 'flex-end',
          'center': 'center',
          'baseline': 'baseline',
          'stretch': 'stretch'
        }
        if (itemsMap[itemsValue]) {
          styles.alignItems = itemsMap[itemsValue]
        }
        return
      }
    })

    return styles
  }],

  [/^(?:flex-)?basis-(.+)$/, ([, d]): StyleObject => {
    const value = isNaN(Number(d)) ? d : Number(d)
    return { flexBasis: value }
  }],

  [/^(?:flex-)?grow(?:-(.*))?$/, ([, d = '']): StyleObject => {
    const value = d === '' ? 1 : Number(d)
    return { flexGrow: value }
  }],

  [/^(?:flex-)?shrink(?:-(.*))?$/, ([, d = '']): StyleObject => {
    const value = d === '' ? 1 : Number(d)
    return { flexShrink: value }
  }],

  [/^flex-(.*)$/, ([, d]): StyleObject => ({ flex: d })],

  ['^flex$', { display: 'flex' }],
  ['inline-flex', { display: 'inline-flex' }],
  ['flex-inline', { display: 'inline-flex' }],
  ['flex-1', { flex: '1 1 0%' }],
  ['flex-auto', { flex: '1 1 auto' }],
  ['flex-initial', { flex: '0 1 auto' }],
  ['flex-none', { flex: 'none' }],
  ['flex-row', { flexDirection: 'row' }],
  ['flex-row-reverse', { flexDirection: 'row-reverse' }],
  ['flex-col', { flexDirection: 'column' }],
  ['flex-col-reverse', { flexDirection: 'column-reverse' }],
  ['flex-wrap', { flexWrap: 'wrap' }],
  ['flex-wrap-reverse', { flexWrap: 'wrap-reverse' }],
  ['flex-nowrap', { flexWrap: 'nowrap' }]
]

export default flex