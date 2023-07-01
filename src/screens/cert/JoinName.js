import React, {useState} from 'react';
import {Keyboard, Pressable, Text, View} from 'react-native';
import UTextInput from 'components/UTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hs, ss} from 'utils/scailing';
import JoinButton from 'components/JoinButton';
import {validateUserName} from 'utils/regex';
import {useEffect} from 'react';
import axios from 'axios';

function JoinName({route, navigation}) {
  const {Email, Password} = route.params;
  const [name, setName] = useState('');
  const [isAbled, setIsAbled] = useState(false);
  const [needAlert, setNeedAlert] = useState(false);
  const alertMSG = [
    `올바른 형식의 닉네임을 입력해주세요(최소 2글자 이상의 한글, 영문자)`,
    `이미 존재하는 이메일입니다.`,
  ];
  const [alertMsgIndex, setAlertIndex] = useState(0);

  useEffect(() => {
    if (!name) {
      setIsAbled(false);
      return setNeedAlert(false);
    }
    if (validateUserName(name)) {
      setNeedAlert(false);
      return setIsAbled(true);
    }
    setIsAbled(false);
    setNeedAlert(true);
    return setAlertIndex(0);
  }, [name]);

  // 2차개발.
  const goNextJoinNavigation = () => {
    navigation.navigate('JoinCamera', {
      Email: Email,
      Password: Password,
      Name: name,
    });
  };

  const checkNickname = async () => {
    try {
      const result = await axios.post('/user/validateNickname', {
        Nickname: name,
      });
      if (result.data) {
        return true;
      }
      console.log(result.data);
      setNeedAlert(true);
      setAlertIndex(1);
      return false;
    } catch (e) {
      console.log(e);
    }
  };

  const registerUserInfo = async () => {
    try {
      const result = await axios.post('/user/create', {
        Account: Email,
        Password: Password,
        Nickname: name,
        CompanyCode: '123123',
        CompanyName: '좋좋소',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePressButton = async () => {
    if (!(await checkNickname())) {
      // goNextJoinNavigation();
      await registerUserInfo();
    }
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
      <UTextInput
        text={'닉네임을 입력해주세요'}
        Icon={<Ionicons name="person" size={ss(20)} color={'#B2B0B0'} />}
        placeholder={'닉네임'}
        value={name}
        setValue={setName}
        maxLength={20}
        setNeedAlert={setNeedAlert}
        validateValue={validateUserName}
      />
      {needAlert ? (
        <Text style={{color: 'red', marginHorizontal: hs(20)}}>
          {alertMSG[alertMsgIndex]}
        </Text>
      ) : null}
      <JoinButton isAbled={isAbled} onPress={handlePressButton} />
    </Pressable>
  );
}

export default JoinName;
