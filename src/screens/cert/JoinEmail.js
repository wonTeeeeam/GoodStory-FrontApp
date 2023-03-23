import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {hs, ss, vs} from '../../utils/scailing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import JoinTextInput from '../../components/organisms/JoinTextInput';

function JoinEmail() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  return (
    <View>
      <JoinTextInput
        text={'이메일을 입력해주세요'}
        Icon={<Fontisto name="email" size={ss(20)} color={'black'} />}
        placeholder={'이메일'}
        value={email}
        setValue={setEmail}
        destination={'JoinPassword'}
        params={{Email: email}}
      />
    </View>
  );
}

export default JoinEmail;
