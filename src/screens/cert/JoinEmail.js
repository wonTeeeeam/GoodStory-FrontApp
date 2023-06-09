import React, {useEffect, useState} from 'react';
import {Keyboard, Pressable, ScrollView, Text} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import JoinTextInput from 'components/JoinTextInput';
import JoinButton from 'components/JoinButton';
import {validateEmail} from 'utils/regex';

function JoinEmail() {
  const [email, setEmail] = useState('');
  const alertMSG = [
    `올바른 형식의 이메일을 입력해주세요(영문자, 숫자, -, _만 가능)`,
    '65자 이상은 불가합니다.',
  ];
  const [alertMsgIndex, setAlertMsgIndex] = useState(0);
  const [needAlert, setNeedAlert] = useState(false);
  const [isAbled, setIsAbled] = useState(false);

  useEffect(() => {
    if (email.length > 64) {
      setIsAbled(false);
      setNeedAlert(true);
      return setAlertMsgIndex(1);
    }
    if (email.length === 0) {
      setIsAbled(false);
      return setNeedAlert(false);
    }
    if (validateEmail(email)) {
      setIsAbled(true);
      return setNeedAlert(false);
    }
    setIsAbled(false);
    setNeedAlert(true);
    return setAlertMsgIndex(0);
  }, [email]);

  return (
    <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        keyboardShouldPersistTaps={'always'}>
        <JoinTextInput
          text={'이메일을 입력해주세요'}
          Icon={<Fontisto name="email" size={ss(20)} color={'#B2B0B0'} />}
          placeholder={'이메일'}
          value={email}
          setValue={setEmail}
          maxLength={65}
          setNeedAlert={setNeedAlert}
          validateValue={validateEmail}
        />
        {needAlert ? (
          <Text style={{color: 'red', marginHorizontal: hs(20)}}>
            {alertMSG[alertMsgIndex]}
          </Text>
        ) : null}
        <JoinButton
          destination={'JoinPassword'}
          params={{Email: email}}
          isAbled={isAbled}
        />
      </ScrollView>
    </Pressable>
  );
}

export default JoinEmail;
