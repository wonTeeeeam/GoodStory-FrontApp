import React, {useState} from 'react';
import {Keyboard, Pressable, Text, View} from 'react-native';
import JoinTextInput from 'components/JoinTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {hs, ss} from 'utils/scailing';
import JoinButton from 'components/JoinButton';
import {validateUserName} from 'utils/regex';
import {useEffect} from 'react';

function JoinName({route, navigation}) {
  const {Email, Password} = route.params;
  const [name, setName] = useState('');
  const [isAbled, setIsAbled] = useState(false);
  const [needAlert, setNeedAlert] = useState(false);
  const alertMSG = [
    `올바른 형식의 닉네임을 입력해주세요(최소 2글자 이상의 한글, 영문자)`,
    '20글자 이상은 불가합니다.',
  ];
  const [alertMsgIndex, setAlertIndex] = useState(1);

  useEffect(() => {
    if (!name) {
      setIsAbled(false);
      return setNeedAlert(false);
    }
    if (name.length > 20) {
      setAlertIndex(2);
      setIsAbled(false);
      return setNeedAlert(true);
    }
    if (validateUserName(name)) {
      setNeedAlert(false);
      return setIsAbled(true);
    }
    setIsAbled(false);
    setNeedAlert(true);
    return setAlertIndex(0);
  }, [name]);

  const goNextJoinNavigation = () => {
    try {
      navigation.navigate('JoinCamera', {
        Email: Email,
        Password: Password,
        Name: name,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
      <JoinTextInput
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
      <JoinButton isAbled={isAbled} onPress={goNextJoinNavigation} />
    </Pressable>
  );
}

export default JoinName;
