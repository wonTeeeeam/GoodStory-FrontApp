import React, {useState, useEffect} from 'react';
import {Keyboard, Pressable, Text} from 'react-native';
import UTextInput from 'components/UTextInput';
import {hs, ss} from 'utils/scailing';
import JoinButton from 'components/button/JoinButton';
import {validateUserName} from 'utils/regex';
import {Ionicons} from 'utils/react-native-vector-helper';
import {JoinStackProps} from 'navigations/types';
import {checkNickname, registerUserInfo} from 'api/join';

const JoinName: React.FC<JoinStackProps> = ({route, navigation}) => {
  const {Email, Password} = route.params as {
    Email: string;
    Password: string;
  };
  const [name, setName] = useState('');
  const handleSetName = (newValue: string) => {
    setName(newValue);
  };
  const [isAbled, setIsAbled] = useState(false);
  const [needAlert, setNeedAlert] = useState(false);
  const handleSetNeedAlert = (newValue: boolean) => {
    setNeedAlert(newValue);
  };
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

  const handlePressButton = async () => {
    if (await checkNickname(name)) {
      setNeedAlert(true);
      setAlertIndex(1);
      return;
    }

    // goNextJoinNavigation();
    await registerUserInfo({Email, Password, name});
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
      <UTextInput
        text={'닉네임을 입력해주세요'}
        Icon={<Ionicons name="person" size={ss(20)} color={'#B2B0B0'} />}
        placeholder={'닉네임'}
        value={name}
        handleSetValue={handleSetName}
        maxLength={20}
        handleSetNeedAlert={handleSetNeedAlert}
        validateValue={validateUserName}
      />
      {needAlert ? (
        <Text style={{color: 'red', marginHorizontal: hs(20)}}>
          {alertMSG[alertMsgIndex]}
        </Text>
      ) : null}
      <JoinButton isAbled={isAbled} handleOnPressBtn={handlePressButton} />
    </Pressable>
  );
};

export default JoinName;
