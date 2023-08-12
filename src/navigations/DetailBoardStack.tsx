import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DetailPost from 'screens/main/DetailPost';
import {black, white} from 'styles';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from 'utils/react-native-vector-helper';
import {BottomStackProps, DetailBoardStackParamList} from './types';

const DetailBoardStack: React.FC = () => {
  const Stack = createNativeStackNavigator<DetailBoardStackParamList>();
  const navigation = useNavigation<BottomStackProps['navigation']>();

  return (
    <Stack.Navigator
      initialRouteName="DetailPost"
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
      {/* <Stack.Screen
        name="Board"
        component={Board}
        options={{headerShown: false}}
      /> */}
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
