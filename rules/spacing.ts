/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleValue, StyleObject, Pattern } from '../types/types'

const parseSpacingValue = (value: string): StyleValue => {
  if (/^-?\d+(\.\d+)?dp$/.test(value)) {
    return Number(value.replace('dp', ''))
  }

  if (/^-?\d+(\.\d+)?(%|vw|vh)$/.test(value)) {
    return value
  }

  const num = Number(value)
  if (!isNaN(num)) {
    return num * 4
  }

  return value
 }

 const handleSpacingValues = (value: string): Record<string, StyleValue> => {
  const styles: Record<string, StyleValue> = {}
  const parts = value.trim().split(/\s+/)

  parts.forEach(part => {
    const [direction, size] = part.split('-')
    if (!direction || !size) return

    switch(direction) {
      case 'x':
        styles.Left = parseSpacingValue(size)
        styles.Right = parseSpacingValue(size)
        break
      case 'y':
        styles.Top = parseSpacingValue(size)
        styles.Bottom = parseSpacingValue(size)
        break
      case 't':
        styles.Top = parseSpacingValue(size)
        break
      case 'b':
        styles.Bottom = parseSpacingValue(size)
        break
      case 'l':
        styles.Left = parseSpacingValue(size)
        break
      case 'r':
        styles.Right = parseSpacingValue(size)
        break
    }
  })

  return Object.keys(styles).length ? styles : { all: parseSpacingValue(value) }
 }

 const spacing: Pattern[] = [
  [/^p="([^"]+)"$/, ([_, value]): StyleObject => {
    const spacings = handleSpacingValues(value)
    const styles: StyleObject = {}

    Object.entries(spacings).forEach(([key, val]) => {
      if (key === 'all') {
        styles.padding = val
      } else {
        styles[`padding${key}`] = val
      }
    })
    return styles
  }],

  [/^m="([^"]+)"$/, ([_, value]): StyleObject => {
    const spacings = handleSpacingValues(value)
    const styles: StyleObject = {}

    Object.entries(spacings).forEach(([key, val]) => {
      if (key === 'all') {
        styles.margin = val
      } else {
        styles[`margin${key}`] = val
      }
    })
    return styles
  }],

  [/^pt="([^"]+)"$/, ([_, value]): StyleObject => ({ paddingTop: parseSpacingValue(value) })],
  [/^pr="([^"]+)"$/, ([_, value]): StyleObject => ({ paddingRight: parseSpacingValue(value) })],
  [/^pb="([^"]+)"$/, ([_, value]): StyleObject => ({ paddingBottom: parseSpacingValue(value) })],
  [/^pl="([^"]+)"$/, ([_, value]): StyleObject => ({ paddingLeft: parseSpacingValue(value) })],
  [/^px="([^"]+)"$/, ([_, value]): StyleObject => ({
    paddingLeft: parseSpacingValue(value),
    paddingRight: parseSpacingValue(value)
  })],
  [/^py="([^"]+)"$/, ([_, value]): StyleObject => ({
    paddingTop: parseSpacingValue(value),
    paddingBottom: parseSpacingValue(value)
  })],

  [/^mt="([^"]+)"$/, ([_, value]): StyleObject => ({ marginTop: parseSpacingValue(value) })],
  [/^mr="([^"]+)"$/, ([_, value]): StyleObject => ({ marginRight: parseSpacingValue(value) })],
  [/^mb="([^"]+)"$/, ([_, value]): StyleObject => ({ marginBottom: parseSpacingValue(value) })],
  [/^ml="([^"]+)"$/, ([_, value]): StyleObject => ({ marginLeft: parseSpacingValue(value) })],
  [/^mx="([^"]+)"$/, ([_, value]): StyleObject => ({
    marginLeft: parseSpacingValue(value),
    marginRight: parseSpacingValue(value)
  })],
  [/^my="([^"]+)"$/, ([_, value]): StyleObject => ({
    marginTop: parseSpacingValue(value),
    marginBottom: parseSpacingValue(value)
  })]
 ]

 export default spacing