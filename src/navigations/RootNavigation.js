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

export default function RootNavigation() {
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
    <NavigationContainer>
      {isUserStartJoin ? <JoinStack /> : <MainStack />}
    </NavigationContainer>
  );
}
