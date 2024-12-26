import { StyleObject } from '../types/types'

type Direction = 't' | 'b' | 'l' | 'r' | 'x' | 'y' | 'block' | 'inline' | 'bs' | 'be' | 'is' | 'ie'

const directionMap: Record<Direction | '', string[]> = {
  '': [''],
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
  t: ['Top'],
  b: ['Bottom'],
  l: ['Left'],
  r: ['Right'],
  bs: ['BlockStart'],
  be: ['BlockEnd'],
  is: ['InlineStart'],
  ie: ['InlineEnd'],
  block: ['BlockStart', 'BlockEnd'],
  inline: ['InlineStart', 'InlineEnd']
}

function parseValue(value: string): number {
  if (value.endsWith('px')) {
    return Number(value.slice(0, -2))
  }
  return Number(value)
}

export function directionSize(property: 'margin' | 'padding') {
  return ([, direction = '', size = '0']: string[]): StyleObject => {
    const sizeValue = parseValue(size)
    const dirs = directionMap[direction as Direction] || ['']
    const styles: StyleObject = {}

    if (dirs.length === 1 && dirs[0] === '') {
      styles[property] = sizeValue
    } else {
      dirs.forEach((dir) => {
        styles[`${property}${dir}`] = sizeValue
      })
    }

    return styles
  }
}

export function handleSpacingAttribute(property: string, value: string): StyleObject {
  const styles: StyleObject = {}

  if (property.endsWith('X')) {
    const baseProp = property.slice(0, -1)
    styles[`${baseProp}Left`] = parseValue(value)
    styles[`${baseProp}Right`] = parseValue(value)
    return styles
  }

  if (property.endsWith('Y')) {
    const baseProp = property.slice(0, -1)
    styles[`${baseProp}Top`] = parseValue(value)
    styles[`${baseProp}Bottom`] = parseValue(value)
    return styles
  }

  if (value.includes(' ')) {
    const parts = value.split(' ')
    parts.forEach(part => {
      const [dir, val] = part.split('-')
      const dirs = directionMap[dir as Direction]
      if (dirs) {
        dirs.forEach((d) => {
          styles[`${property}${d}`] = parseValue(val)
        })
      }
    })
    return styles
  }

  return { [property]: parseValue(value) }
}