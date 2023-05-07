import * as React from 'react';
import {Text, View} from 'react-native';
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
import {useState} from 'react';
import * as Keychain from 'react-native-keychain';
import MyPage from '../screens/myPage';
import {useEffect} from 'react';

function BottomStack() {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchAccessToken = async () => {
      const credentials = await Keychain.getInternetCredentials('accessToken');
      setAccessToken(credentials.password);
    };
    fetchAccessToken();
  }, []);

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
