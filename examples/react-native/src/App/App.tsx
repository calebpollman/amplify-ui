import React from 'react';
import { Pressable, StyleSheet, SafeAreaView, Text } from 'react-native';

import { InAppMessageLayout } from '@aws-amplify/notifications';
import {
  InAppMessageDisplay,
  InAppMessagingProvider,
  useInAppMessaging,
} from '@aws-amplify/ui-react-native';

import { localMessages, layouts } from './utils/localMessages';

const messageStyle = {
  body: { backgroundColor: 'lightgrey' },
  closeIconButton: { backgroundColor: 'teal' },
  closeIconColor: 'blue',
  // container: { backgroundColor: 'pink' },
  header: { backgroundColor: 'coral' },
  image: { backgroundColor: 'yellow' },
  primaryButton: { container: { backgroundColor: 'red' } },
  secondaryButton: { container: { backgroundColor: 'antiquewhite' } },
};

const Content = ({ layout }: { layout: InAppMessageLayout }) => {
  const { displayMessage } = useInAppMessaging();
  const message = localMessages[layout];
  return (
    <Pressable
      onPress={() => {
        displayMessage(message);
      }}
      style={{
        backgroundColor: 'black',
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 4,
        padding: 8,
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
        {layout}
      </Text>
    </Pressable>
  );
};

const App = () => {
  return (
    <InAppMessagingProvider>
      <InAppMessageDisplay
        styles={{
          bannerMessage: messageStyle,
          carouselMessage: messageStyle,
          fullScreenMessage: messageStyle,
          modalMessage: messageStyle,
        }}
      />
      <SafeAreaView style={style.container}>
        {layouts.map((layout) => (
          <Content layout={layout} key={layout} />
        ))}
      </SafeAreaView>
    </InAppMessagingProvider>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: 'antiquewhite',
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
