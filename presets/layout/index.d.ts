/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'react-native'
import { FlexStyle } from '../../types/rules/flex'
import { SizeStyle } from '../../types/rules/size'
import { SpacingStyle } from '../../types/rules/spacing'

declare module 'react-native' {
  interface LayoutStyle extends FlexStyle, SizeStyle, SpacingStyle {}

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