import React, {useState} from 'react';
import {View} from 'react-native';
import JoinTextInput from 'components/JoinTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ss} from 'utils/scailing';
import JoinButton from 'components/JoinButton';

function JoinName({route, navigation}) {
  const {Email, Password} = route.params;
  const [name, setName] = useState('');
  return (
    <View>
      <JoinTextInput
        text={'닉네임을 입력해주세요'}
        Icon={<Ionicons name="person" size={ss(20)} color={'#B2B0B0'} />}
        placeholder={'닉네임'}
        value={name}
        setValue={setName}
      />
      <JoinButton
        destination={'JoinCamera'}
        params={{Email: Email, Password: Password, Name: name}}
      />
    </View>
  );
}

export default JoinName;
