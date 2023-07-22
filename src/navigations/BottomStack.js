import * as React from 'react';
import {Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from 'screens/cert/Login';
import Posting from 'screens/posting/Posting';
import Topic from 'screens/topic/Topic';
import BoardStack from './BoardStack';
import MyPage from 'screens/myPage';
import {useSelector} from 'react-redux';
import BottomTabBar from 'components/BottomTabBar';

function BottomStack() {
  const Tab = createBottomTabNavigator();
  const {userId} = useSelector(state => state.user);

  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      backBehavior="initialRoute">
      <Tab.Screen
        name="BoardStack"
        component={BoardStack}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name="Topic"
        component={Topic}
        options={{
          headerShown: false,
          tabBarLabel: '주제별게시판',
        }}
      />
      <Tab.Screen
        name="Posting"
        component={userId ? Posting : Posting}
        options={{
          headerShown: false,
          tabBarLabel: '글작성',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={userId ? MyPage : Login}
        options={{
          headerShown: false,
          tabBarLabel: '마이페이지',
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomStack;
