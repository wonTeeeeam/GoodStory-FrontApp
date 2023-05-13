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
import useLogin from '../hooks/useLogin';

export default function RootNavigation() {
  const isUserStartJoin = useSelector(state => state.user.isUserStartJoin);
  const {handleLogin} = useLogin();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const IDCredentials = await Keychain.getInternetCredentials('ID');
        const passwordCredentials = await Keychain.getInternetCredentials(
          'password',
        );
        if (IDCredentials.password && passwordCredentials.password) {
          await handleLogin(
            IDCredentials.password,
            passwordCredentials.password,
          );
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchAccessToken();
  }, [handleLogin, dispatch]);

  return (
    // theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
    <NavigationContainer>
      {isUserStartJoin ? <JoinStack /> : <MainStack />}
    </NavigationContainer>
  );
}
