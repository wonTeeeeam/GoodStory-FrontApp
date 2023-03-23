import React, {useCallback, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Board from '../screens/main/Board';
import DetailPost from '../screens/main/DetailPost';
import {BackgroundColor} from '../styles/BackgroundColor';
import {TextColor} from '../styles/TextColor';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {Modal, Pressable, Text, View} from 'react-native';
import {ss} from '../utils/scailing';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import JoinEmail from '../screens/cert/JoinEmail';
import Login from '../screens/cert/Login';
import JoinPassword from '../screens/cert/JoinPassword';
import JoinName from '../screens/cert/JoinName';
import JoinCamera from '../screens/cert/JoinCamera';

const Stack = createNativeStackNavigator();

export default function JoinStack() {
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSetIsModalVisible = useCallback(isVisible => {
    setIsModalVisible(isVisible);
  }, []);

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
                navigation.goBack();
              }}
            />
          );
        },
      }}>
      <Stack.Screen
        name="JoinEmail"
        component={JoinEmail}
        options={{headerShown: true, headerTitle: '회원가입'}}
      />

      <Stack.Screen
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
