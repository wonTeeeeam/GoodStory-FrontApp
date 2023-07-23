import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {black, white} from 'styles';
import {Ionicons} from 'utils/react-native-vector-helper';
import Posting from 'screens/posting/PostingMain';

function PostingStack() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="PostingMain"
      screenOptions={{
        headerStyle: {backgroundColor: white.snow},
        headerLeft: () => {
          return (
            <Ionicons
              name="chevron-back"
              color={black.origin}
              size={20}
              onPress={() => {
                // navigation.navigate('Posting');
              }}
            />
          );
        },
      }}>
      <Stack.Screen
        name="PostingMain"
        component={PostingMain}
        options={{headerShown: false}}
        initialParams={{boardTopic: route?.params?.boardTopic || 'Free'}}
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
          headerTitle: route?.params?.boardTopic || 'Free',
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

export default PostingStack;
