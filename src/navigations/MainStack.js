import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomStack from './BottomStack';

function MainStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="BottomStack">
      <Stack.Screen
        name="BottomStack"
        component={BottomStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
