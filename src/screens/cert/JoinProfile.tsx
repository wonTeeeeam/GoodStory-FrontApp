import {registerUserInfo} from 'api/join';
import ProfileSetting from 'components/ProfileSetting';
import JoinButton from 'components/button/JoinButton';
import {JoinStackProps} from 'navigations/types';
import React from 'react';
import {View, Text} from 'react-native';

import {hs, vs} from 'utils/scailing';

const JoinProfile: React.FC<JoinStackProps> = ({route, navigation}) => {
  const {Email, Password, Nickname} = route.params as {
    Email: string;
    Password: string;
    Nickname: string;
  };

  const handlePressButton = async () => {
    await registerUserInfo({Email, Password, Nickname});
  };

  return (
    <View>
      <View style={{marginHorizontal: hs(20)}}>
        <Text style={{color: 'black', marginTop: vs(30)}}>
          프로필 이미지를 설정해주세요
        </Text>
        <View style={{alignItems: 'center', marginTop: vs(30)}}>
          <ProfileSetting />
        </View>
        <JoinButton isAbled={true} handleOnPressBtn={handlePressButton} />
      </View>
    </View>
  );
};

export default JoinProfile;
