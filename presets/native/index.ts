import { Pattern } from '../../types/types'
import align from '../../rules/align'
import border from '../../rules/border'
import color from '../../rules/color'
import decoration from '../../rules/decoration'
import flex from '../../rules/flex'
import font from '../../rules/font'
import size from '../../rules/size'
import spacing from '../../rules/spacing'
import text from '../../rules/text'
import position from '../../rules/position'
import transform from '../../rules/transform'

export function nativePreset(): Pattern[] {
  return [
    ...align,
    ...border,
    ...color,
    ...decoration,
    ...flex,
    ...font,
    ...size,
    ...spacing,
    ...text,
    ...position,
    ...transform
  ]
}
