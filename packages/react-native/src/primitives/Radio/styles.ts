import { StyleSheet } from 'react-native';

import { RadioStyles } from './types';

const AMPLIFY_BLUE = '#317d95';
const ROUNDED_BORDER_RADIUS: number = 999;

export const styles: RadioStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  radioContainer: {
    alignItems: 'center',
    borderColor: AMPLIFY_BLUE,
    borderRadius: ROUNDED_BORDER_RADIUS,
    borderWidth: 1,
    justifyContent: 'center',
  },
  radioDot: {
    backgroundColor: AMPLIFY_BLUE,
    borderRadius: ROUNDED_BORDER_RADIUS,
  },
  radioContainerLarge: {
    height: 24,
    width: 24,
  },
  radioContainerMedium: {
    height: 20,
    width: 20,
  },
  radioContainerSmall: {
    height: 16,
    width: 16,
  },
  radioDotLarge: {
    height: 12,
    width: 12,
  },
  radioDotMedium: {
    height: 10,
    width: 10,
  },
  radioDotSmall: {
    height: 8,
    width: 8,
  },
});
