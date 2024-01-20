import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import uuid from 'react-native-uuid';

import App from './src/App';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (!remoteMessage.data) return;

  const alarmList = await AsyncStorage.getItem('alarmList');

  const newList = [
    {
      messageId: uuid.v4(),
      title: remoteMessage.notification?.title,
      body: remoteMessage.notification?.body,
      sendTime: remoteMessage.sentTime,
      boardItem: JSON.parse(remoteMessage.data.boardItem),
    },
    ...(alarmList ? JSON.parse(alarmList) : []),
  ];

  await AsyncStorage.setItem('alarmList', JSON.stringify(newList));
});

AppRegistry.registerComponent(appName, () => App);
