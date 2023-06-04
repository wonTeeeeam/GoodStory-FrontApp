import React, {useCallback, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BackgroundColor} from 'styles/BackgroundColor';
import {TextColor} from 'styles/TextColor';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import JoinEmail from 'screens/cert/JoinEmail';
import JoinPassword from 'screens/cert/JoinPassword';
import JoinName from 'screens/cert/JoinName';
import JoinCamera from 'screens/cert/JoinCamera';
import {useDispatch} from 'react-redux';
import {handleIsUserStartJoin} from 'slice/navigationSlice';

const Stack = createNativeStackNavigator();

export default function JoinStack() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      initialRouteName="JoinEmail"
      screenOptions={{
        headerStyle: {backgroundColor: BackgroundColor.snow},
        headerLeft: () => {
          return (
            <Ionicons
              name="chevron-back"
              color={TextColor.black}
              size={20}
              onPress={() => {
                const stackLength = navigation.getState().routes.length;
                if (stackLength === 1) {
                  return dispatch(handleIsUserStartJoin());
                }
                return navigation.goBack();
              }}
            />
          );
        },
      }}>
      <Stack.Screen
        key={'1'}
        name="JoinEmail"
        component={JoinEmail}
        options={{headerShown: true, headerTitle: '회원가입'}}
      />

      <Stack.Screen
        key={'2'}
        name="JoinPassword"
        component={JoinPassword}
        options={{headerShown: true, headerTitle: '회원가입'}}
      />
      <Stack.Screen
        name="JoinName"
        component={JoinName}
        options={{headerShown: true, headerTitle: '회원가입'}}
      />
      <Stack.Screen
        name="JoinCamera"
        component={JoinCamera}
        options={{headerShown: true, headerTitle: '회원가입'}}
      />
      {/* <Stack.Screen
        name="BusinessCard"
        component={BusinessCard}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
}
