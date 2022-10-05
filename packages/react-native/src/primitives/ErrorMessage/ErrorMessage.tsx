import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { icons } from '../../assets';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

import { ErrorMessageProps } from './types';
import { styles } from './styles';

export default function Label({
  accessibilityRole = 'alert',
  children,
  onDismiss,
  style,
  textStyle,
  ...rest
}: ErrorMessageProps): JSX.Element | null {
  const [dismissed, setDismissed] = useState<boolean>(false);

  const dismissErrorMessage = React.useCallback(() => {
    setDismissed(!dismissed);

    if (typeof onDismiss === 'function') {
      onDismiss();
    }
  }, [dismissed, setDismissed, onDismiss]);

  return dismissed ? null : (
    <View
      {...rest}
      accessibilityRole={accessibilityRole}
      style={[styles.container, style]}
    >
      {/* <Icon source={icons.error} size={20} style={{ marginRight: 'auto' }} /> */}
      <Icon
        source={icons.error}
        size={20}
        style={{ margin: 4, backgroundColor: 'antiquewhite' }}
      />
      <Text
        style={[
          { paddingHorizontal: 4, backgroundColor: 'red', flex: 1 },
          textStyle,
        ]}
      >
        {children}
      </Text>
      <IconButton
        source={icons.close}
        size={20}
        onPress={dismissErrorMessage}
        style={{ margin: 4, backgroundColor: 'lightblue' }}
        testID="dismissButton"
      />
    </View>
  );
}
