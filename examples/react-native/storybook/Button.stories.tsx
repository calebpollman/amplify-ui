import React from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import { Button } from '@aws-amplify/ui-react-native';

const buttonStories = storiesOf('Buttons', module);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { backgroundColor: 'pink' },
});

buttonStories.add('Example', () => (
  <View style={styles.container}>
    <Button style={styles.button}>HI</Button>
  </View>
));
