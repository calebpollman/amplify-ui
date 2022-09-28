import { PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { LabelPosition } from '../Label/types';

export type Size = number | 'small' | 'medium' | 'large';

export interface RadioProps<T> extends PressableProps {
  disabled?: boolean;
  label?: string;
  labelPosition?: LabelPosition;
  labelStyle?: StyleProp<TextStyle>;
  onChange?: (value?: T) => void;
  radioContainerStyle?: StyleProp<ViewStyle>;
  radioDotStyle?: StyleProp<ViewStyle>;
  size?: Size;
  selected?: boolean;
  value: T;
}

export interface RadioSize {
  borderWidth?: number;
  height: number;
  width: number;
}

interface RadioSizes {
  large: RadioSize;
  medium: RadioSize;
  small: RadioSize;
}

export interface RadioStyles extends RadioSizes {
  container: ViewStyle;
  disabled: ViewStyle;
  radioContainer: ViewStyle;
  radioDot: ViewStyle;
}
