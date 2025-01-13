/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pattern, StyleObject } from '../types/types'

const processValue = (value: string): string => {
  const fractionMatch = value.match(/(-?\d+)\/(\d+)/)
  if (fractionMatch) {
    const [_, numerator, denominator] = fractionMatch
    const percentage = (Number(numerator) / Number(denominator)) * 100
    return `${percentage}%`
  }

  return value
}

const processTransformValue = (transform: string): string => {
  const transformFunctions = transform.match(/\w+\([^)]+\)/g) || []

  return transformFunctions.map(func => {
    const matched = func.match(/(\w+)\(([^)]+)\)/)
    if (!matched) return func

    const [_, funcName, value] = matched

    if (funcName === 'skewX' || funcName === 'skewY') {
      const processed = processValue(value.trim())
      return `${funcName}(${processed.includes('deg') ? processed : `${processed}deg`})`
    }

    const processedValue = processValue(value.trim())
    return `${funcName}(${processedValue})`
  }).join(' ')
}

const transform: Pattern[] = [
  ['transform',
  ([_, value]): StyleObject => {
    try {
      const processedTransform = processTransformValue(value)
      return {
        transform: processedTransform
      }
    } catch (error) {
      return {
        transform: 'none'
      }
    }
  }]
]

export default transform