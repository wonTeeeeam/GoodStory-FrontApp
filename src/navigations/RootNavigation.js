import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import MainStack from './MainStack';
import JoinStack from './JoinStack';

export default function RootNavigation() {
  const user = useSelector(state => state.user.value);
  return (
    <NavigationContainer>
      {user ? <MainStack /> : <JoinStack />}
    </NavigationContainer>
  );
}
