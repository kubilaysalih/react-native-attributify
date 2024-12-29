/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pattern, StyleObject } from '../types/types'

const flex: Pattern[] = [
  ['^flex$', { display: 'flex' }],
  ['flex-1', { flex: 1 }],
  ['flex-auto', { flex: 'auto' }],
  ['flex-initial', { flex: '0 1 auto' }],
  ['flex-none', { flex: 'none' }],

  [/^flex-(.+)$/, ([, value]): StyleObject => ({
    flex: isNaN(Number(value)) ? value : Number(value)
  })],

  [/^flex="([^"]+)"$/, ([_, value]): StyleObject => {
    if (!value) return {}

    const parts: string[] = value.split(' ')
    const styles: StyleObject = {}

    parts.forEach(part => {
      if (!isNaN(Number(part))) {
        styles.flex = Number(part)
        return
      }

      const specialValues: Record<string, StyleObject> = {
        'auto': { flex: '1 1 auto' },
        'none': { flex: 'none' },
        'initial': { flex: '0 1 auto' }
      }

      if (specialValues[part]) {
        Object.assign(styles, specialValues[part])
        return
      }

      if (['row', 'row-reverse', 'column', 'col', 'col-reverse', 'column-reverse'].includes(part)) {
        styles.flexDirection = part.replace('col', 'column')
        return
      }

      if (['wrap', 'wrap-reverse', 'nowrap'].includes(part)) {
        styles.flexWrap = part
        return
      }

      if (part.startsWith('justify-')) {
        const value = part.replace('justify-', '')
        const justifyMap: Record<string, string> = {
          'start': 'flex-start',
          'end': 'flex-end',
          'center': 'center',
          'between': 'space-between',
          'around': 'space-around',
          'evenly': 'space-evenly'
        }
        styles.justifyContent = justifyMap[value] || value
        return
      }

      if (part.startsWith('items-')) {
        const value = part.replace('items-', '')
        const alignMap: Record<string, string> = {
          'start': 'flex-start',
          'end': 'flex-end',
          'center': 'center',
          'baseline': 'baseline',
          'stretch': 'stretch'
        }
        styles.alignItems = alignMap[value] || value
        return
      }

      if (part.startsWith('content-')) {
        const value = part.replace('content-', '')
        const alignMap: Record<string, string> = {
          'start': 'flex-start',
          'end': 'flex-end',
          'center': 'center',
          'between': 'space-between',
          'around': 'space-around',
          'stretch': 'stretch'
        }
        styles.alignContent = alignMap[value] || value
      }

      if (part.startsWith('self-')) {
        const value = part.replace('self-', '')
        const alignMap: Record<string, string> = {
          'start': 'flex-start',
          'end': 'flex-end',
          'center': 'center',
          'stretch': 'stretch'
        }
        styles.alignSelf = alignMap[value] || value
      }
    })

    return styles
  }],

  ['flex-row', { flexDirection: 'row' }],
  ['flex-row-reverse', { flexDirection: 'row-reverse' }],
  ['flex-col', { flexDirection: 'column' }],
  ['flex-col-reverse', { flexDirection: 'column-reverse' }],

  ['flex-wrap', { flexWrap: 'wrap' }],
  ['flex-wrap-reverse', { flexWrap: 'wrap-reverse' }],
  ['flex-nowrap', { flexWrap: 'nowrap' }],

  [/^justify-(.+)$/, ([, value]): StyleObject => {
    const justifyMap: Record<string, string> = {
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'between': 'space-between',
      'around': 'space-around',
      'evenly': 'space-evenly'
    }
    return { justifyContent: justifyMap[value] || value }
  }],

  [/^items-(.+)$/, ([, value]): StyleObject => {
    const alignMap: Record<string, string> = {
      'start': 'flex-start',
      'end': 'flex-end',
      'center': 'center',
      'baseline': 'baseline',
      'stretch': 'stretch'
    }
    return { alignItems: alignMap[value] || value }
  }]
]

export default flex
