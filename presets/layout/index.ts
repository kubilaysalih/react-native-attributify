import { Pattern } from '../../types/types'
import flex from '../../rules/flex'
import position from '../../rules/position'
import size from '../../rules/size'
import spacing from '../../rules/spacing'

export function layoutPreset(): Pattern[] {
  return [
    ...flex,
    ...position,
    ...size,
    ...spacing
  ]
}