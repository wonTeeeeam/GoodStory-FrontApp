import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import MainStack from './MainStack';
import JoinStack from './JoinStack';

export default function RootNavigation() {
  const isUserStartJoin = useSelector(state => state.user.isUserStartJoin);
  return (
    <NavigationContainer>
      {isUserStartJoin ? <JoinStack /> : <MainStack />}
    </NavigationContainer>
  );
}
