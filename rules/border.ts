/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleValue, StyleObject, Pattern } from '../types/types'

const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'none']

const parseBorderValue = (value: string): StyleValue => {
  if (value.startsWith('r-')) {
    const num = Number(value.slice(2))
    return !isNaN(num) ? num : value
  }

  const num = Number(value)
  if (!isNaN(num)) {
    return num
  }
  if (/^-?\d+(\.\d+)?(px|rem|em)$/.test(value)) {
    return value
  }
  return value
}

const parseBorderString = (value: string): StyleObject => {
  const parts = value.split(' ')
  const styles: StyleObject = {}

  parts.forEach(part => {
    if (part.startsWith('r-')) {
      const radius = parseBorderValue(part)
      if (typeof radius === 'number') {
        styles.borderRadius = radius
      }
      return
    }

    if (borderStyles.includes(part)) {
      styles.borderStyle = part
      return
    }

    if (part.startsWith('#') || /^rgb/.test(part) || /^[a-zA-Z]+$/.test(part)) {
      styles.borderColor = part
      return
    }

    const width = parseBorderValue(part)
    if (typeof width === 'number') {
      styles.borderWidth = width
    }
  })

  return styles
}

const borders: Pattern[] = [
  ['b', ([_, value]): StyleObject => {
    if (!value) return {}
    return parseBorderString(value)
  }],

  ['border', ([_, value]): StyleObject => {
    if (!value) return {}
    return parseBorderString(value)
  }],

  [/^border-(\d+(?:\.\d+)?(?:px|rem|em)?)$/, ([_, value]): StyleObject => {
    return { borderWidth: Number(value.replace(/px|rem|em/, '')) }
  }],

  [/^border-([^"']+)$/, ([_, value]): StyleObject => {
    return parseBorderString(value)
  }],

  [/^b-(\d+(?:\.\d+)?(?:px|rem|em)?)$/, ([_, value]): StyleObject => {
    return { borderWidth: Number(value.replace(/px|rem|em/, '')) }
  }],

  [/^b-([^"']+)$/, ([_, value]): StyleObject => {
    return parseBorderString(value)
  }],

  ['bt', ([_, value]): StyleObject => {
    if (!value) return {}
    const styles = parseBorderString(value)
    const directionStyles: StyleObject = {}

    Object.entries(styles).forEach(([key, val]) => {
      if (key === 'borderRadius') {
        directionStyles.borderTopLeftRadius = val
        directionStyles.borderTopRightRadius = val
      } else if (key === 'borderWidth') {
        directionStyles.borderTopWidth = val
      } else if (key === 'borderColor') {
        directionStyles.borderTopColor = val
      }
    })

    return directionStyles
  }],

  ['br', ([_, value]): StyleObject => {
    if (!value) return {}
    const styles = parseBorderString(value)
    const directionStyles: StyleObject = {}

    Object.entries(styles).forEach(([key, val]) => {
      if (key === 'borderRadius') {
        directionStyles.borderTopRightRadius = val
        directionStyles.borderBottomRightRadius = val
      } else if (key === 'borderWidth') {
        directionStyles.borderRightWidth = val
      } else if (key === 'borderColor') {
        directionStyles.borderRightColor = val
      }
    })

    return directionStyles
  }],

  ['bb', ([_, value]): StyleObject => {
    if (!value) return {}
    const styles = parseBorderString(value)
    const directionStyles: StyleObject = {}

    Object.entries(styles).forEach(([key, val]) => {
      if (key === 'borderRadius') {
        directionStyles.borderBottomLeftRadius = val
        directionStyles.borderBottomRightRadius = val
      } else if (key === 'borderWidth') {
        directionStyles.borderBottomWidth = val
      } else if (key === 'borderColor') {
        directionStyles.borderBottomColor = val
      }
    })

    return directionStyles
  }],

  ['bl', ([_, value]): StyleObject => {
    if (!value) return {}
    const styles = parseBorderString(value)
    const directionStyles: StyleObject = {}

    Object.entries(styles).forEach(([key, val]) => {
      if (key === 'borderRadius') {
        directionStyles.borderTopLeftRadius = val
        directionStyles.borderBottomLeftRadius = val
      } else if (key === 'borderWidth') {
        directionStyles.borderLeftWidth = val
      } else if (key === 'borderColor') {
        directionStyles.borderLeftColor = val
      }
    })

    return directionStyles
  }],

  [/^(?:border|b)([trbl])-([^"']+)$/, ([_, dir, value]): StyleObject => {
    const styles = parseBorderString(value)
    const directionStyles: StyleObject = {}

    Object.entries(styles).forEach(([key, val]) => {
      switch (dir) {
        case 't':
          if (key === 'borderRadius') {
            directionStyles.borderTopLeftRadius = val
            directionStyles.borderTopRightRadius = val
          } else if (key === 'borderWidth') {
            directionStyles.borderTopWidth = val
          } else if (key === 'borderColor') {
            directionStyles.borderTopColor = val
          }
          break
        case 'r':
          if (key === 'borderRadius') {
            directionStyles.borderTopRightRadius = val
            directionStyles.borderBottomRightRadius = val
          } else if (key === 'borderWidth') {
            directionStyles.borderRightWidth = val
          } else if (key === 'borderColor') {
            directionStyles.borderRightColor = val
          }
          break
        case 'b':
          if (key === 'borderRadius') {
            directionStyles.borderBottomLeftRadius = val
            directionStyles.borderBottomRightRadius = val
          } else if (key === 'borderWidth') {
            directionStyles.borderBottomWidth = val
          } else if (key === 'borderColor') {
            directionStyles.borderBottomColor = val
          }
          break
        case 'l':
          if (key === 'borderRadius') {
            directionStyles.borderTopLeftRadius = val
            directionStyles.borderBottomLeftRadius = val
          } else if (key === 'borderWidth') {
            directionStyles.borderLeftWidth = val
          } else if (key === 'borderColor') {
            directionStyles.borderLeftColor = val
          }
          break
      }
    })

    return directionStyles
  }],

  ...borderStyles.map(style => ([
    `border-${style}`,
    { borderStyle: style }
  ])) as Pattern[],

  ...borderStyles.map(style => ([
    `b-${style}`,
    { borderStyle: style }
  ])) as Pattern[],

  // Border radius patterns
  [/^r-(\d+(?:\.\d+)?)$/, ([_, value]): StyleObject => {
    const radius = Number(value)
    return { borderRadius: radius }
  }],

  [/^r(\d+(?:\.\d+)?)$/, ([_, value]): StyleObject => {
    const radius = Number(value)
    return { borderRadius: radius }
  }],

  // Corner-specific radius patterns
  [/^r([trbl])-(\d+(?:\.\d+)?)$/, ([_, corner, value]): StyleObject => {
    const radius = Number(value)
    const styles: StyleObject = {}

    switch (corner) {
      case 't':
        styles.borderTopLeftRadius = radius
        styles.borderTopRightRadius = radius
        break
      case 'r':
        styles.borderTopRightRadius = radius
        styles.borderBottomRightRadius = radius
        break
      case 'b':
        styles.borderBottomLeftRadius = radius
        styles.borderBottomRightRadius = radius
        break
      case 'l':
        styles.borderTopLeftRadius = radius
        styles.borderBottomLeftRadius = radius
        break
    }

    return styles
  }],

  [/^r([trbl])(\d+(?:\.\d+)?)$/, ([_, corner, value]): StyleObject => {
    const radius = Number(value)
    const styles: StyleObject = {}

    switch (corner) {
      case 't':
        styles.borderTopLeftRadius = radius
        styles.borderTopRightRadius = radius
        break
      case 'r':
        styles.borderTopRightRadius = radius
        styles.borderBottomRightRadius = radius
        break
      case 'b':
        styles.borderBottomLeftRadius = radius
        styles.borderBottomRightRadius = radius
        break
      case 'l':
        styles.borderTopLeftRadius = radius
        styles.borderBottomLeftRadius = radius
        break
    }

    return styles
  }]
]

export default borders
