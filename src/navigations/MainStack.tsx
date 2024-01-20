import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import uuid from 'react-native-uuid';

import BottomStack from './BottomStack';
import DetailBoardStack from './DetailBoardStack';
import MyPageStack from './MyPageStack';
import {MainStackParamList, MainStackProps} from './types';

function MainStack() {
  const Stack = createNativeStackNavigator<MainStackParamList>();
  const navigation = useNavigation<MainStackProps['navigation']>();

  const setNewAlarmList = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
    needNavigate: boolean = true,
  ) => {
    if (!remoteMessage.data) return;

    const alarmList = await AsyncStorage.getItem('alarmList');

    const newList = [
      {
        messageId: uuid.v4(),
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        sendTime: remoteMessage.sentTime,
        boardItem: JSON.parse(remoteMessage.data.boardItem as string),
      },
      ...(alarmList ? JSON.parse(alarmList) : []),
    ];

    await AsyncStorage.setItem('alarmList', JSON.stringify(newList));

    if (needNavigate) navigation.navigate('MyPageStack', {screen: 'Alarm'});
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(remoteMessage => {
      setNewAlarmList(remoteMessage, false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      setNewAlarmList(remoteMessage);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          setNewAlarmList(remoteMessage);
        }
      });
  }, []);

  return (
    <Stack.Navigator initialRouteName="BottomStack">
      <Stack.Screen
        name="BottomStack"
        component={BottomStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailBoardStack"
        component={DetailBoardStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyPageStack"
        component={MyPageStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
