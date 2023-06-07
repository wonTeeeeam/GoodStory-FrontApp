import React, {useEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import JoinTextInput from 'components/JoinTextInput';
import JoinButton from 'components/JoinButton';

function JoinEmail() {
  const [email, setEmail] = useState('');

  return (
    <View>
      <JoinTextInput
        text={'이메일을 입력해주세요'}
        Icon={<Fontisto name="email" size={ss(20)} color={'#B2B0B0'} />}
        placeholder={'이메일'}
        value={email}
        setValue={setEmail}
      />
      <JoinTextInput
        text={'인증번호를 입력해주세요'}
        Icon={<Fontisto name="email" size={ss(20)} color={'#B2B0B0'} />}
        placeholder={'인증번호'}
        value={email}
        setValue={setEmail}
      />
      <JoinButton destination={'JoinPassword'} params={{Email: email}} />
    </View>
  );
}

export default JoinEmail;
