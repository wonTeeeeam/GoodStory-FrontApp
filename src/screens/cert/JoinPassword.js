import React, {useState} from 'react';
import {Keyboard, Pressable, ScrollView, Text, View} from 'react-native';
import JoinTextInput from 'components/JoinTextInput';
import {hs, ss} from 'utils/scailing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JoinButton from 'components/JoinButton';
import {useEffect} from 'react';
import {validatePWD} from 'utils/regex';
import {useCallback} from 'react';

function JoinPassword({route, navigation}) {
  const {Email} = route.params;
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const alertMSGForPWD = [
    `올바른 형식의 비밀번호를 입력해주세요.(최소 영문자 1글자, 특수문자 또는 숫자 1글자. 공백 불가)`,
    '8자 이상 입력해주세요.',
    '30자 이상은 불가합니다.',
  ];
  const [alertMsgPWDIndex, setAlertMsgPWDIndex] = useState(0);
  const [needAlertPWD, setNeedAlertPWD] = useState(false);

  const alertMSGForRePWD = [`비밀번호가 일치하지 않습니다`];
  const [alertMsgRePWDIndex, setAlertMsgRePWDIndex] = useState(0);
  const [needAlertRePWD, setNeedAlertRePWD] = useState(false);

  const [isAbled, setIsAbled] = useState(false);

  const validateRePWD = useCallback(() => {
    if (rePassword && password === rePassword) {
      return true;
    }
    return false;
  }, [password, rePassword]);

  useEffect(() => {
    if (password.length === 0) {
      setIsAbled(false);
      return setNeedAlertPWD(false);
    }
    if (password.length > 0 && password.length < 8) {
      setIsAbled(false);
      setNeedAlertPWD(true);
      return setAlertMsgPWDIndex(1);
    }
    if (password.length > 30) {
      setIsAbled(false);
      setNeedAlertPWD(true);
      return setAlertMsgPWDIndex(2);
    }

    if (validatePWD(password)) {
      setIsAbled(true);
      setNeedAlertPWD(false);
      return setAlertMsgPWDIndex(null);
    }
    setIsAbled(false);
    setNeedAlertPWD(true);
    return setAlertMsgPWDIndex(0);
  }, [password]);

  useEffect(() => {
    if (!rePassword) {
      setIsAbled(false);
      return setNeedAlertRePWD(false);
    }
    if (validatePWD(password) && validateRePWD()) {
      setIsAbled(true);
      return setNeedAlertRePWD(false);
    } else {
      setIsAbled(false);
      return setNeedAlertRePWD(true);
    }
  }, [password, rePassword, validateRePWD]);

  const goNextJoinNavigation = () => {
    try {
      navigation.navigate('JoinName', {Email: Email, Password: password});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <JoinTextInput
          text={'비밀번호를 입력해주세요'}
          Icon={<AntDesign name="lock" size={ss(20)} color={'#B2B0B0'} />}
          placeholder={'비밀번호'}
          value={password}
          setValue={setPassword}
          maxLength={30}
          setNeedAlert={setNeedAlertPWD}
          isPassword={true}
          validateValue={validatePWD}
        />
        {needAlertPWD ? (
          <Text style={{color: 'red', marginHorizontal: hs(20)}}>
            {alertMSGForPWD[alertMsgPWDIndex]}
          </Text>
        ) : null}
        <JoinTextInput
          text={'비밀번호를 재입력해주세요'}
          Icon={<AntDesign name="lock" size={ss(20)} color={'#B2B0B0'} />}
          placeholder={'비밀번호 재입력'}
          value={rePassword}
          setValue={setRePassword}
          maxLength={30}
          setNeedAlert={setNeedAlertRePWD}
          isPassword={true}
          validateValue={validateRePWD}
        />
        {needAlertRePWD ? (
          <Text style={{color: 'red', marginHorizontal: hs(20)}}>
            {alertMSGForRePWD[alertMsgRePWDIndex]}
          </Text>
        ) : null}
        <JoinButton isAbled={isAbled} onPress={goNextJoinNavigation} />
      </ScrollView>
    </Pressable>
  );
}

export default JoinPassword;
