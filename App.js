import {SafeAreaView} from 'react-native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import Stack from './src/navigation/Stack';
import {NativeBaseProvider, Box} from 'native-base';

import {Provider} from 'react-redux';
import Store from './src/redux/Store';

const App = () => {
  return (
    <NativeBaseProvider>
      <Provider store={Store}>
        <Stack />
        <FlashMessage position="top" />
      </Provider>
    </NativeBaseProvider>
  );
};

export default App;
