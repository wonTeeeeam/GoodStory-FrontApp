import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JoinTextInput from 'components/JoinTextInput';
import JoinButton from 'components/JoinButton';

function JoinEmail() {
  const [email, setEmail] = useState('');

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <JoinTextInput
          text={'이메일을 입력해주세요'}
          Icon={<Fontisto name="email" size={ss(20)} color={'#B2B0B0'} />}
          placeholder={'이메일'}
          value={email}
          setValue={setEmail}
        />
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: '#029BFE',
            height: vs(30),
            marginTop: vs(30),
            marginHorizontal: hs(20),
            // borderRadius: ss(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: ss(17)}}>인증번호 전송</Text>
        </Pressable>
        <JoinTextInput
          text={'인증번호를 입력해주세요'}
          Icon={<AntDesign name="check" size={ss(20)} color={'#B2B0B0'} />}
          placeholder={'인증번호'}
          value={email}
          setValue={setEmail}
        />
        <JoinButton destination={'JoinPassword'} params={{Email: email}} />
      </ScrollView>
    </Pressable>
  );
}

export default JoinEmail;
