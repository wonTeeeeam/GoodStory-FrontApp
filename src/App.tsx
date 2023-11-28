import React, {useEffect} from 'react';
import {Platform, View, Text, StatusBar} from 'react-native';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';

import messaging from '@react-native-firebase/messaging';
// import codePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import {MIN_ANDROID_VERSION} from './config';
import RootNavigation from './navigations/RootNavigation';
import {Provider} from 'react-redux';
import {store} from 'store/store';

const App = () => {
  useEffect(() => {
    const initializeApp = async () => {
      SplashScreen.hide();
      await requestPermission();
    };
    initializeApp();
  }, []);

  const requestPermission = async () => {
    const checkPermission = await checkNotificationPermission();
    if (checkPermission !== RESULTS.GRANTED) {
      const request = await requestNotificationPermission();
      if (request !== RESULTS.GRANTED) {
        console.log(request);
        // permission not granted
      }
    }
  };

  const requestNotificationPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };

  const checkNotificationPermission = async () => {
    const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    return result;
  };

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //     });
  // }, []);

  if ((Platform.Version as number) < MIN_ANDROID_VERSION) {
    return (
      <View>
        <Text>스마트폰 업데이트 후 사용해주세요.</Text>
      </View>
    );
  }
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar />
        <RootNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

// App = codePush({checkFrequency: codePush.checkFrequency.ON_App_START})(App);
export default App;
