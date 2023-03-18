import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import BottomStack from './BottomStack';

export default function RootNavigation() {
  const [user, setUser] = useState(false);
  return (
    <NavigationContainer>
      <BottomStack />
    </NavigationContainer>
  );
}
