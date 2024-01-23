import React, {useEffect} from 'react';
import {Platform, View, Text, StatusBar} from 'react-native';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';

import CodePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {MIN_ANDROID_VERSION} from './config';
import RootNavigation from './navigations/RootNavigation';
import {Provider} from 'react-redux';
import {store} from 'store/store';
import {PostListElement} from 'hooks/useFetchPostList';

export type Message = {
  messageId: string;
  title: string;
  body: string;
  sendTime: string;
  boardItem: PostListElement;
};

const App = () => {
  useEffect(() => {
    const initializeApp = async () => {
      await requestPermission();
    };
    initializeApp();
  }, []);

  const requestPermission = async () => {
    const checkPermission = await checkNotificationPermission();
    if (checkPermission !== RESULTS.GRANTED) {
      const request = await requestNotificationPermission();
      if (request !== RESULTS.GRANTED) {
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

export default CodePush(App);
