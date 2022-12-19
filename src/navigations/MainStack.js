import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from '../screens/main/Main';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="Email"
        component={Email}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="Password"
        component={Password}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="NickName"
        component={NickName}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="BusinessCard"
        component={BusinessCard}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
}
