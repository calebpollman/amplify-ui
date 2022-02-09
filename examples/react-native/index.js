import 'react-native-get-random-values';
import 'react-native-url-polyfill';

import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import config from 'react-native-config';

import App from './App';
import { name as appName } from './app.json';

import { loadStories } from './storybook/storyLoader';

const isStorybook = config.STORYBOOK === 'true';

console.log('config', config);

if (isStorybook) {
  configure(() => {
    loadStories();
  }, module);
}

const StorybookUIRoot = getStorybookUI({
  asyncStorage: require('@react-native-async-storage/async-storage').default,
});

AppRegistry.registerComponent(appName, () =>
  isStorybook ? StorybookUIRoot : App,
);
