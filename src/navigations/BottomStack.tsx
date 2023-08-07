import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from 'screens/cert/Login';
import Posting from 'screens/posting/PostingMain';
import Topic from 'screens/topic/Topic';
import BoardStack from './BoardStack';
import MyPage from 'screens/myPage';
import BottomTabBar from 'components/BottomTabBar';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';
import {BottomStackParamList} from './types';

function BottomStack() {
  const Tab = createBottomTabNavigator<BottomStackParamList>();
  const {userId} = useAppSelector((state: RootState) => state.user);

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
        initialParams={{boardTopic: 'Free'}}
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
        component={userId ? Posting : Login}
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
