/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'react-native'
import { AlignStyle } from '../../types/rules/align.d'
import { BorderStyle } from '../../types/rules/border'
import { ColorStyle } from '../../types/rules/color'
import { DecorationStyle } from '../../types/rules/decoration'
import { FlexStyle } from '../../types/rules/flex'
import { SizeStyle } from '../../types/rules/size'
import { SpacingStyle } from '../../types/rules/spacing'
import { PositionStyle } from '../../types/rules/position'
import { TransformStyle } from '../../types/rules/transform'
import { TextStyle as AttributifyTextStyle } from '../../types/rules/text'

declare module 'react-native' {
  interface LayoutStyle extends AlignStyle, BorderStyle, ColorStyle, DecorationStyle, FlexStyle, SizeStyle, SpacingStyle, PositionStyle, AttributifyTextStyle, TransformStyle {}

  interface ViewStyle extends LayoutStyle {}
  interface ViewProps extends LayoutStyle {}

  interface TextStyle extends LayoutStyle {}
  interface TextProps extends LayoutStyle {}

  interface ImageStyle extends LayoutStyle {}
  interface ImageProps extends LayoutStyle {}

  interface TouchableOpacityProps extends LayoutStyle {}

  interface ScrollViewProps extends LayoutStyle {}

  interface SafeAreaViewProps extends LayoutStyle {}

  interface FlatListProps extends LayoutStyle {}

  interface KeyboardAvoidingViewProps extends LayoutStyle {}

  interface RefreshControlProps extends LayoutStyle {}

  interface ModalProps extends LayoutStyle {}

  interface ActivityIndicatorProps extends LayoutStyle {}

  interface ButtonProps extends LayoutStyle {}

  interface PressableProps extends LayoutStyle {}
}