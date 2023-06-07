import React, {useState} from 'react';
import {View} from 'react-native';
import JoinTextInput from 'components/JoinTextInput';
import {ss} from 'utils/scailing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JoinButton from 'components/JoinButton';

function JoinPassword({route, navigation}) {
  const {Email} = route.params;
  const [password, setPassword] = useState('');
  return (
    <View>
      <JoinTextInput
        text={'비밀번호를 입력해주세요'}
        Icon={<AntDesign name="lock" size={ss(20)} color={'#B2B0B0'} />}
        placeholder={'비밀번호'}
        value={password}
        setValue={setPassword}
      />
      <JoinTextInput
        text={'비밀번호를 재입력해주세요'}
        Icon={<AntDesign name="lock" size={ss(20)} color={'#B2B0B0'} />}
        placeholder={'비밀번호'}
        value={password}
        setValue={setPassword}
      />
      <JoinButton
        destination={'JoinName'}
        params={{Email: Email, Password: password}}
      />
    </View>
  );
}

export default JoinPassword;
