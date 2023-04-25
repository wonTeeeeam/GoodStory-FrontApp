import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Board from '../screens/main/Board';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BackgroundColor} from '../styles/BackgroundColor';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextColor} from '../styles/TextColor';
import DetailPost from '../screens/main/DetailPost';
import {ss} from '../utils/scailing';
import Login from '../screens/cert/Login';
import Alarm from '../screens/alarm/Alarm';
import Setting from '../screens/setting/Setting';
import Posting from '../screens/posting/Posting';
import Topic from '../screens/topic/Topic';
import BoardStack from './BoardStack';

function BottomStack() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();

  return (
    <Tab.Navigator backBehavior="history">
      <Tab.Screen
        name="BoardStack"
        component={BoardStack}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Entypo
              name="home"
              color={'blue'}
              size={ss(20)}
              onPress={() => navigation.navigate('BoardStack')}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Topic"
        component={Topic}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialIcons
              name="topic"
              color={'blue'}
              size={ss(20)}
              onPress={() => navigation.navigate('Topic')}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons
              name="person"
              color={'blue'}
              size={ss(20)}
              onPress={() => navigation.navigate('Login')}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Posting"
        component={Posting}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Entypo
              name="pencil"
              color={'blue'}
              size={ss(20)}
              onPress={() => navigation.navigate('Posting')}
            />
          ),
          tabBarShowLabel: false,
        }}
      />

      {/* <Tab.Screen name="Settings" component={} /> */}
    </Tab.Navigator>
  );
}

export default BottomStack;
