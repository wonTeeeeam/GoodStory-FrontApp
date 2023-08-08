import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Board from 'screens/main/Board';
import DetailPost from 'screens/main/DetailPost';
import {black, white} from 'styles';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from 'utils/react-native-vector-helper';
import {BoardStackParamList, BottomStackProps} from './types';

// type Props = {
//   route: BoardStackProps;
// };

const BoardStack = ({route}: BottomStackProps) => {
  const Stack = createNativeStackNavigator<BoardStackParamList>();
  const navigation = useNavigation<BottomStackProps['navigation']>();

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
                navigation.goBack();
              }}
            />
          );
        },
      }}>
      <Stack.Screen
        name="Board"
        component={Board}
        options={{headerShown: false}}
        initialParams={{
          boardTopic: (route.params && route.params.boardTopic) || 'Free',
        }}
      />
      <Stack.Screen
        name="DetailPost"
        component={DetailPost}
        options={{
          headerShown: true,
          // headerTitle: route?.params?.boardTopic || 'Free',
          headerTitleStyle: {},
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default BoardStack;
