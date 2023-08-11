import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from 'screens/cert/Login';
import Posting from 'screens/posting/PostingMain';
import Topic from 'screens/topic/Topic';
import BoardStack from './BoardStack';
import MyPage from 'screens/myPage';
import {
  Feather,
  MaterialCommunityIcons,
  Octicons,
} from 'utils/react-native-vector-helper';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';
import {BottomStackParamList} from './types';
import {ss} from 'utils/scailing';
import {black, gray} from 'styles';

function BottomStack() {
  const Tab = createBottomTabNavigator<BottomStackParamList>();
  const {userId} = useAppSelector((state: RootState) => state.user);

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName="BoardStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: black.origin,
        tabBarInactiveTintColor: gray.origin,
        tabBarStyle: {backgroundColor: gray.lightGray},
        tabBarActiveBackgroundColor: gray.gainsboro,
      }}>
      <Tab.Screen
        name="BoardStack"
        component={BoardStack}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({focused}) => (
            <Feather
              name="home"
              color={focused ? black.origin : gray.origin}
              size={ss(20)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Topic"
        component={Topic}
        options={{
          tabBarLabel: '주제별게시판',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              color={focused ? black.origin : gray.origin}
              size={ss(20)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Posting"
        component={userId ? Posting : Login}
        options={{
          tabBarLabel: '글작성',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="pencil-outline"
              color={focused ? black.origin : gray.origin}
              size={ss(20)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={userId ? MyPage : Login}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({focused}) => (
            <Octicons
              name="person"
              color={focused ? black.origin : gray.origin}
              size={ss(20)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomStack;
