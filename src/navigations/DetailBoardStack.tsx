import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DetailPost from 'screens/main/DetailPost';
import {white} from 'styles';
import {DetailBoardStackParamList} from './types';

const DetailBoardStack: React.FC = () => {
  const Stack = createNativeStackNavigator<DetailBoardStackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="DetailPost"
      screenOptions={{
        headerStyle: {backgroundColor: white.snow},
      }}>
      <Stack.Screen
        name="DetailPost"
        component={DetailPost}
        options={{
          headerShown: true,
          title: '',
          headerTitleStyle: {},
        }}
      />
    </Stack.Navigator>
  );
};

export default DetailBoardStack;
