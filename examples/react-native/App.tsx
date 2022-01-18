import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useUtility, UtilityOptions } from '@aws-amplify/ui-react-native';

const options: UtilityOptions = { name: 'test test' };

const App = () => {
  const utilityName = useUtility(options);
  return (
    <View style={style.container}>
      <Text style={style.text}>{utilityName}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 },
});

export default App;
