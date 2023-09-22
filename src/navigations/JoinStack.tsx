import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {black, white} from 'styles';

import {useNavigation} from '@react-navigation/native';
import JoinEmail from 'screens/cert/JoinEmail';
import JoinPassword from 'screens/cert/JoinPassword';
import JoinName from 'screens/cert/JoinName';
import JoinCamera from 'screens/cert/JoinCamera';
import {useDispatch} from 'react-redux';
import {handleIsUserStartJoin} from 'slice/navigationSlice';
import {Ionicons} from 'utils/react-native-vector-helper';
import {JoinStackParamList} from './types';

const Stack = createNativeStackNavigator<JoinStackParamList>();

const JoinStack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      initialRouteName="JoinEmail"
      screenOptions={{
        headerStyle: {backgroundColor: white.snow},
        headerLeft: () => {
          return (
            <Ionicons
              name="chevron-back"
              color={black.origin}
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
};

export default JoinStack;
