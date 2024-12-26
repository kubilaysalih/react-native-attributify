import { StyleObject } from '../types/types'

export const generateStyleHash = (styles: StyleObject, prefix: string): string => {
  const styleStr = Object.entries(styles)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join(';')

  let hash = 0
  for (let i = 0; i < styleStr.length; i++) {
    const char = styleStr.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }

  return prefix + Math.abs(hash).toString(36)
}