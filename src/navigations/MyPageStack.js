import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Announcement from 'screens/myPage/Announcement';

import ResetPassword from 'screens/myPage/ResetPassword';
import Configuration from 'screens/myPage/Configuration';
import Withdrawal from 'screens/myPage/Withdrawal';
import AnnouncementDetail from 'screens/myPage/AnnouncementDetail';

function MyPageStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: true, headerTitle: '비밀번호 변경'}}
      />
      <Stack.Screen
        name="Announcement"
        component={Announcement}
        options={{headerShown: true, headerTitle: '공지사항'}}
      />
      <Stack.Screen
        name="AnnouncementDetail"
        component={AnnouncementDetail}
        options={{headerShown: true, headerTitle: '공지사항'}}
      />
      <Stack.Screen
        name="Configuration"
        component={Configuration}
        options={{headerShown: true, headerTitle: '환경설정'}}
      />
      <Stack.Screen
        name="Withdrawal"
        component={Withdrawal}
        options={{headerShown: true, headerTitle: '회원탈퇴'}}
      />
    </Stack.Navigator>
  );
}

export default MyPageStack;
