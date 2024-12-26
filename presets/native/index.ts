import { Pattern } from '../../types/types'
import align from '../../rules/align'
import border from '../../rules/border'
import color from '../../rules/color'
import decoration from '../../rules/decoration'
import flex from '../../rules/flex'
import position from '../../rules/position'
import size from '../../rules/size'
import spacing from '../../rules/spacing'

export function nativePreset(): Pattern[] {
  return [
    ...align,
    ...border,
    ...color,
    ...decoration,
    ...flex,
    ...position,
    ...size,
    ...spacing
  ]
}