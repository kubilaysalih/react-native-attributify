import { Pattern, StyleObject } from '../types/types'

const parseAlignStyle = (value: string): StyleObject => {
  const parts = value.split(' ')
  const styles: StyleObject = {}

  parts.forEach((part) => {
    // Text alignment
    if (['left', 'center', 'right', 'justify'].includes(part)) {
      styles.textAlign = part
      return
    }

    // Flex alignment (items)
    if (['flex-start', 'flex-end', 'center', 'stretch', 'baseline'].includes(part)) {
      styles.alignItems = part
      return
    }

    // Self alignment
    if (part.startsWith('self-')) {
      const selfAlign = part.replace('self-', '')
      if (['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'].includes(selfAlign)) {
        styles.alignSelf = selfAlign
      }
      return
    }
  })

  return styles
}

const align: Pattern[] = [
  ['align', ([, value]): StyleObject => {
    if (!value) return {}
    return parseAlignStyle(value)
  }]
]

export default align
