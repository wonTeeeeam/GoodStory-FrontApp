import * as React from 'react';
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

function BottomStack() {
  const Tab = createBottomTabNavigator();
  const {userId} = useSelector(state => state.user);

  return (
    <Tab.Navigator backBehavior="initialRoute">
      <Tab.Screen
        name="BoardStack"
        component={BoardStack}
        options={{
          headerShown: false,
          tabBarIcon: () => <Entypo name="home" color={'blue'} size={ss(20)} />,
          tabBarLabel: '홈',
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
          tabBarLabel: '주제별게시판',
        }}
      />
      <Tab.Screen
        name="Posting"
        component={userId ? Posting : Login}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Entypo name="pencil" color={'blue'} size={ss(20)} />
          ),
          tabBarLabel: '글작성',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={userId ? MyPage : Login}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="person" color={'blue'} size={ss(20)} />
          ),
          tabBarLabel: '마이페이지',
        }}
      />

      {/* <Tab.Screen name="Settings" component={} /> */}
    </Tab.Navigator>
  );
}

export default BottomStack;
