import * as React from 'react';
import {Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ss} from 'utils/scailing';
import Login from 'screens/cert/Login';
import Posting from 'screens/posting/Posting';
import Topic from 'screens/topic/Topic';
import BoardStack from './BoardStack';
import MyPage from 'screens/myPage';
import {useSelector} from 'react-redux';
import {black, gray, white} from 'styles';
import BottomTabBar from 'components/BottomTabBar';

function BottomStack() {
  const Tab = createBottomTabNavigator();
  const {userId} = useSelector(state => state.user);

  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      // backBehavior="initialRoute"
      // screenOptions={{
      //   tabBarStyle: {
      //     backgroundColor: white.snow,
      //     borderTopWidth: 0,
      //     borderTopLeftRadius: ss(10),
      //     borderTopRightRadius: ss(10),
      //     position: 'absolute',
      //   },
      //   tabBarLabelStyle: {},
      //   tabBarItemStyle: {
      //     margin: 5,
      //     borderRadius: 10,
      //   },
      // tabBarActiveTintColor: black.origin,
      // tabBarInactiveTintColor: gray.dimGray,
      // tabBarLabelPosition: 'beside-icon',
      // }}
    >
      <Tab.Screen
        name="BoardStack"
        component={BoardStack}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <Entypo focused={focused} name="home" color={color} size={ss(20)} />
          ),
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name="Topic"
        component={Topic}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons
              focused={focused}
              name="topic"
              color={color}
              size={ss(20)}
            />
          ),
          tabBarLabel: '주제별게시판',
        }}
      />
      <Tab.Screen
        name="Posting"
        component={userId ? Posting : Login}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <Entypo
              focued={focused}
              name="pencil"
              color={color}
              size={ss(20)}
            />
          ),
          tabBarLabel: '글작성',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={userId ? MyPage : Login}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <Ionicons
              focused={focused}
              name="person"
              color={color}
              size={ss(20)}
            />
          ),
          tabBarLabel: '마이페이지',
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomStack;
