import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Board from 'screens/main/Board';
import DetailPost from 'screens/main/DetailPost';
import {black, white} from 'styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

function BoardStack({route}) {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Board"
      screenOptions={{
        headerStyle: {backgroundColor: white.snow},
        headerLeft: () => {
          return (
            <Ionicons
              name="chevron-back"
              color={black.origin}
              size={20}
              onPress={() => {
                navigation.navigate('Board');
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

export default BoardStack;
