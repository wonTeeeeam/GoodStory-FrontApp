import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import App from './src/App';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  const alarmList = await AsyncStorage.getItem('alarmList');

  const newList = alarmList ? JSON.parse(alarmList) : [];

  if (remoteMessage.data) {
    newList.push({
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      sendTime: remoteMessage.sentTime,
      boardId: remoteMessage.data.boardId,
    });
  }

  await AsyncStorage.setItem('alarmList', JSON.stringify(newList));
});

AppRegistry.registerComponent(appName, () => App);
