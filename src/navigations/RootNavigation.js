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

export default function RootNavigation() {
  const isUserStartJoin = useSelector(state => state.user.isUserStartJoin);
  const scheme = useColorScheme();

  return (
    // theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
    <NavigationContainer>
      {isUserStartJoin ? <JoinStack /> : <MainStack />}
    </NavigationContainer>
  );
}
