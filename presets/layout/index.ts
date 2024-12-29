import { Pattern } from '../../types/types'
import flex from '../../rules/flex'
import size from '../../rules/size'
import spacing from '../../rules/spacing'

export function layoutPreset(): Pattern[] {
  return [
    ...flex,
    ...size,
    ...spacing
  ]
}