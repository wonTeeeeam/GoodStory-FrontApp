import React from 'react';
import {Platform, View, Text, StatusBar} from 'react-native';
// import codePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';
import {MIN_ANDROID_VERSION} from './config';
import RootNavigation from './navigations/RootNavigation';

let App = () => {
  if (Platform.Version < MIN_ANDROID_VERSION) {
    return (
      <View>
        <Text>스마트폰 업데이트 후 사용해주세요.</Text>
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <StatusBar />
      <Icon name="rocket" size={30} color="#900" />
      <RootNavigation />
    </SafeAreaProvider>
  );
};

// App = codePush({checkFrequency: codePush.checkFrequency.ON_App_START})(App);
export default App;
