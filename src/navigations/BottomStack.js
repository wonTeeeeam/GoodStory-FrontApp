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
import JoinStack from './JoinStack';

function BottomStack() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  function Main() {
    return (
      <Stack.Navigator
        initialRouteName="Board"
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
          // headerRight: () => {
          //   return (
          //     <Entypo
          //       name="dots-three-vertical"
          //       color={TextColor.black}
          //       size={20}
          //       onPress={() => {
          //         handleSetIsModalVisible(true);
          //       }}
          //     />
          //   );
          // },
        }}>
        <Stack.Screen
          name="Board"
          component={Board}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailPost"
          component={DetailPost}
          initialParams={
            {
              // isModalVisible: isModalVisible,
            }
          }
          options={{
            headerShown: true,
            headerTitle: '좋',
            headerTitleStyle: {},
            // animationTypeForReplace: 'push',
            animation: 'slide_from_right',
          }}
        />
        {/* <Stack.Screen
        name="Password"
        component={Password}
        options={{headerShown: false}}
      /> */}
        {/* <Stack.Screen
        name="NickName"
        component={NickName}
        options={{headerShown: false}}
      /> */}
        {/* <Stack.Screen
        name="BusinessCard"
        component={BusinessCard}
        options={{headerShown: false}}
      /> */}
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator initialRouteName="Main" backBehavior="history">
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Entypo
              name="home"
              color={'blue'}
              size={ss(20)}
              onPress={() => navigation.navigate('Main')}
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
        name="JoinStack"
        component={JoinStack}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons
              name="person"
              color={'blue'}
              size={ss(20)}
              onPress={() => navigation.navigate('JoinStack')}
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
      <Tab.Screen
        name="Alarm"
        component={Alarm}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="alarm-light"
              color={'blue'}
              size={ss(20)}
              onPress={() => navigation.navigate('Alarm')}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <AntDesign
              name="setting"
              color={'blue'}
              size={ss(20)}
              onPress={() => navigation.navigate('Setting')}
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
