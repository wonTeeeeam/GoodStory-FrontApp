import React, {useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

export default function RootNavigation() {
  const [user, setUser] = useState(false);
  return <NavigationContainer></NavigationContainer>;
}
