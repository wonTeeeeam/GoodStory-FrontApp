import {JoinStackProps} from 'navigations/types';
import React from 'react';
import {View} from 'react-native';

const JoinProfile: React.FC<JoinStackProps> = ({route, navigation}) => {
  const {Email, Password, Nickname} = route.params as {
    Email: string;
    Password: string;
    Nickname: string;
  };
  return <View></View>;
};

export default JoinProfile;
