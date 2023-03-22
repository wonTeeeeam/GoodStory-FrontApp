import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import BottomStack from './BottomStack';
import MainStack from './MainStack';

export default function RootNavigation() {
  const [user, setUser] = useState(false);
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
