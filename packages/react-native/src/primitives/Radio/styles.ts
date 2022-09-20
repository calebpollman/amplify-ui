import { StyleSheet } from 'react-native';

import { RadioStyles } from './types';

export const styles: RadioStyles = StyleSheet.create({
  outer: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 2,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#838c95',

    large: {
      height: 40,
      width: 40,
      borderRadius: 40,
    },

    small: {
      height: 20,
      width: 20,
      borderRadius: 20,
    },
  },
  inner: {
    backgroundColor: '#317d95',
    height: 15,
    width: 15,
    borderRadius: 15,

    large: {
      height: 20,
      width: 20,
      borderRadius: 10,
    },

    small: {
      height: 10,
      width: 10,
      borderRadius: 10,
    },
  },
  // focused: {
  //   borderWidth: 30,
  //   borderColor: '#15404d',
  //   outlineColor: 'red',
  //   outlineWidth: 4,
  // },
});
