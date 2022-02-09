import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  Button,
  useUtility,
  UtilityOptions,
} from '@aws-amplify/ui-react-native';

const options: UtilityOptions = { name: 'test test' };

const App = () => {
  const utilityName = useUtility(options);
  const [pressedCount, setPressedCount] = useState(0);

  const handlePress = () => {
    setPressedCount((count) => count + 1);
  };

  return (
    <View style={style.container}>
      <Text style={style.heading}>{utilityName}</Text>
      <Button
        onPress={handlePress}
        style={style.button}
        testID="increment-button"
      >
        <Text style={style.text}>Press Me</Text>
      </Button>
      <Text
        style={style.text}
        testID="pressed-count"
      >{`Pressed Count: ${pressedCount}`}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  button: { borderRadius: 16, borderWidth: 1, padding: 4 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heading: { fontSize: 24 },
  text: { fontSize: 16 },
});

export default App;
