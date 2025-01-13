/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pattern, StyleObject } from '../types/types'

export type PositionValue =
  | 'absolute'
  | 'relative'
  | 'static'

const position: Pattern[] = [
  [/^pos-(.+)$/, ([, value]): StyleObject => ({
    position: value as PositionValue
  })],

  ['pos', ([_, value]): StyleObject => {
    if (!value) return {}
    return { position: value as PositionValue }
  }],

  [/^z-(\d+)$/, ([, value]): StyleObject => ({
    zIndex: Number(value)
  })],

  [/^z-(auto)$/, ([, value]): StyleObject => ({
    zIndex: value
  })],

  ['z', ([_, value]): StyleObject => {
    if (!value) return {}
    return { zIndex: value === 'auto' ? value : Number(value) }
  }],

  [/^left-(\d+|auto)$/, ([, value]): StyleObject => ({
    left: value === 'auto' ? value : Number(value)
  })],

  [/^right-(\d+|auto)$/, ([, value]): StyleObject => ({
    right: value === 'auto' ? value : Number(value)
  })],

  [/^top-(\d+|auto)$/, ([, value]): StyleObject => ({
    top: value === 'auto' ? value : Number(value)
  })],

  [/^bottom-(\d+|auto)$/, ([, value]): StyleObject => ({
    bottom: value === 'auto' ? value : Number(value)
  })],

  ['inset', ([_, value]): StyleObject => {
    if (!value) return {}

    const parts: string[] = value.split(' ')
    const styles: StyleObject = {}

    parts.forEach(part => {
      const [direction, size] = part.split('-')
      if (!size) return

      const value = size === 'auto' ? size : Number(size)

      switch(direction) {
        case 'top':
          styles.top = value
          break
        case 'right':
          styles.right = value
          break
        case 'bottom':
          styles.bottom = value
          break
        case 'left':
          styles.left = value
          break
      }
    })

    return styles
  }]
]

export default position