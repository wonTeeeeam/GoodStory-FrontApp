import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Board from 'screens/main/Board';
import DetailPost from 'screens/main/DetailPost';
import {black, white} from 'styles';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from 'utils/react-native-vector-helper';
import {BoardStackParamList, BoardStackProps} from './types';

const BoardStack: React.FC<BoardStackProps> = ({route}) => {
  const Stack = createNativeStackNavigator<BoardStackParamList>();
  const navigation = useNavigation<BoardStackProps['navigation']>();

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
        options={{
          headerShown: true,
          headerTitle: route?.params?.boardTopic || 'Free',
          headerTitleStyle: {},
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default BoardStack;
