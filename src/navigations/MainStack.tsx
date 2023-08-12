import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import BottomStack from './BottomStack';
import MyPageStack from './MyPageStack';
import {MainStackParamList} from './types';
import DetailBoardStack from './DetailBoardStack';

function MainStack() {
  const Stack = createNativeStackNavigator<MainStackParamList>();

  return (
    <Stack.Navigator initialRouteName="BottomStack">
      <Stack.Screen
        name="BottomStack"
        component={BottomStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailBoardStack"
        component={DetailBoardStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyPageStack"
        component={MyPageStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
