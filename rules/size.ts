/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pattern, StyleObject, StyleValue } from '../types/types'

const parseSizeValue = (value: string): StyleValue => {
  if (!isNaN(Number(value))) {
    return Number(value)
  }

  switch(value) {
    case 'full':
      return '100%'
    case 'screen':
      return '100%'
    case 'half':
      return '50%'
    case 'auto':
      return 'auto'
    default:
      return value
  }
}

const sizeRules: Pattern[] = [
  ['w', ([_, value]): StyleObject => ({
    width: parseSizeValue(value)
  })],

  ['h', ([_, value]): StyleObject => ({
    height: parseSizeValue(value)
  })],

  ['min-w', ([_, value]): StyleObject => ({
    minWidth: parseSizeValue(value)
  })],

  ['max-w', ([_, value]): StyleObject => ({
    maxWidth: parseSizeValue(value)
  })],

  ['min-h', ([_, value]): StyleObject => ({
    minHeight: parseSizeValue(value)
  })],

  ['max-h', ([_, value]): StyleObject => ({
    maxHeight: parseSizeValue(value)
  })],

  ['size', ([_, value]): StyleObject => {
    const parts = value.split(' ')
    const styles: StyleObject = {}

    if (parts.length === 1) {
      const size = parseSizeValue(parts[0])
      styles.width = size
      styles.height = size
    }
    else if (parts.length === 2) {
      styles.width = parseSizeValue(parts[0])
      styles.height = parseSizeValue(parts[1])
    }
    else if (parts.length === 3 && parts[1] === 'x') {
      styles.width = parseSizeValue(parts[0])
      styles.height = parseSizeValue(parts[2])
    }

    return styles
  }],

  ['aspect', ([_, ratio]): StyleObject => {
    let aspectRatio: number = 1

    if (ratio.includes('/')) {
      const [width, height] = ratio.split('/').map(Number)
      if (!isNaN(width) && !isNaN(height) && height !== 0) {
        aspectRatio = width / height
      }
    }
    else {
      switch(ratio) {
        case 'square':
          aspectRatio = 1
          break
        case 'video':
          aspectRatio = 16/9
          break
        default:
          if (!isNaN(Number(ratio))) aspectRatio = Number(ratio)
      }
    }

    return { aspectRatio }
  }]
]

export default sizeRules