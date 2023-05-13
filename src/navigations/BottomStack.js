import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ss} from '../utils/scailing';
import Login from '../screens/cert/Login';
import Posting from '../screens/posting/Posting';
import Topic from '../screens/topic/Topic';
import BoardStack from './BoardStack';
import MyPage from '../screens/myPage';
import {useDispatch, useSelector} from 'react-redux';

function BottomStack() {
  const Tab = createBottomTabNavigator();
  const accessToken = useSelector(state => state.user.accessToken);

  return (
    <Tab.Navigator backBehavior="history">
      <Tab.Screen
        name="BoardStack"
        component={BoardStack}
        options={{
          headerShown: false,
          tabBarIcon: () => <Entypo name="home" color={'blue'} size={ss(20)} />,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Topic"
        component={Topic}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialIcons name="topic" color={'blue'} size={ss(20)} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Posting"
        component={accessToken ? Posting : Login}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Entypo name="pencil" color={'blue'} size={ss(20)} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Login"
        component={accessToken ? MyPage : Login}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="person" color={'blue'} size={ss(20)} />
          ),
          tabBarShowLabel: false,
        }}
      />

      {/* <Tab.Screen name="Settings" component={} /> */}
    </Tab.Navigator>
  );
}

export default BottomStack;
