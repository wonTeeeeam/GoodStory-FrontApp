import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import BottomStack from './BottomStack';
import MainStack from './MainStack';
import JoinStack from './JoinStack';

export default function RootNavigation() {
  const [isJoinStack, setIsJoinStack] = useState(false);
  return (
    <NavigationContainer>
      {isJoinStack ? <JoinStack /> : <MainStack />}
    </NavigationContainer>
  );
}
