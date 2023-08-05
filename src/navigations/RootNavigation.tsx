import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import MainStack from './MainStack';
import JoinStack from './JoinStack';
import useLogin from 'hooks/useLogin';
import useAxiosInterceptor from 'hooks/useAxiosInterceptor';
import {white} from 'styles';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';

export default function RootNavigation() {
  useAxiosInterceptor();
  const isUserStartJoin = useAppSelector(
    (state: RootState) => state.navigation.isUserStartJoin,
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
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {...DefaultTheme.colors, background: white.snow},
      }}>
      {isUserStartJoin ? <JoinStack /> : <MainStack />}
    </NavigationContainer>
  );
}
