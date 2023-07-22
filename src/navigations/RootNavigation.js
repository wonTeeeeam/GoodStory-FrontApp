import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import MainStack from './MainStack';
import JoinStack from './JoinStack';
import {useColorScheme} from 'react-native';
import * as Keychain from 'react-native-keychain';
import useLogin from 'hooks/useLogin';
import useAxiosInterceptor from 'hooks/useAxiosInterceptor';
import {white} from 'styles';

export default function RootNavigation() {
  useAxiosInterceptor();
  const isUserStartJoin = useSelector(
    state => state.navigation.isUserStartJoin,
  );
  const {handleAutoLogin} = useLogin();

  useEffect(() => {
    const autoLogin = async () => {
      await handleAutoLogin();
    };
    autoLogin();
  }, []);

  return (
    // theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
    <NavigationContainer theme={{colors: {background: white.snow}}}>
      {isUserStartJoin ? <JoinStack /> : <MainStack />}
    </NavigationContainer>
  );
}
