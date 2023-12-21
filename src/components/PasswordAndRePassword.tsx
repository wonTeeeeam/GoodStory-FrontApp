import React, {useEffect, useCallback, useState} from 'react';
import {Keyboard, Pressable, ScrollView, Text} from 'react-native';
import {validatePWD} from 'utils/regex';
import UTextInput from './UTextInput';
import LongButton from './button/LongButton';
import {hs, ss} from 'utils/scailing';
import {AntDesign} from 'utils/react-native-vector-helper';

type Props = {
  password: string;
  handleSetPassword: (newValue: string) => void;
  rePassword: string;
  handleSetRePassword: (newValue: string) => void;
  btnText: string;
  handleOnPressBtn: () => Promise<void> | void;
};

const PasswordAndRePassword: React.FC<Props> = ({
  password,
  handleSetPassword,
  rePassword,
  handleSetRePassword,
  btnText,
  handleOnPressBtn,
}) => {
  const alertMSGForPWD = [
    '올바른 형식의 비밀번호를 입력해주세요.(최소 영문자 1글자, 특수문자 또는 숫자 1글자. 공백 불가)',
    '8자 이상 입력해주세요.',
  ];
  const [alertMsgPWDIndex, setAlertMsgPWDIndex] = useState(0);
  const [needAlertPWD, setNeedAlertPWD] = useState(false);

  const handleSetNeedAlertPWD = (newValue: boolean) => {
    setNeedAlertPWD(newValue);
  };

  const alertMSGForRePWD = ['비밀번호가 일치하지 않습니다'];
  const [alertMsgRePWDIndex, setAlertMsgRePWDIndex] = useState(0);

  const [needAlertRePWD, setNeedAlertRePWD] = useState(false);

  const handleSetNeedAlertRePWD = (newValue: boolean) => {
    setNeedAlertRePWD(newValue);
  };

  const [isAbled, setIsAbled] = useState(false);

  const validateRePWD = useCallback(() => {
    return rePassword && password === rePassword ? true : false;
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

    if (validatePWD(password)) {
      setIsAbled(true);
      setNeedAlertPWD(false);
      return setAlertMsgPWDIndex(0);
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

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <UTextInput
          text={'비밀번호를 입력해주세요'}
          Icon={<AntDesign name="lock" size={ss(20)} color={'#B2B0B0'} />}
          placeholder={'비밀번호'}
          value={password}
          handleSetValue={handleSetPassword}
          maxLength={30}
          handleSetNeedAlert={handleSetNeedAlertPWD}
          isPassword={true}
          validateValue={validatePWD}
          isNumeric={false}
        />
        {needAlertPWD ? (
          <Text style={{color: 'red', marginHorizontal: hs(20)}}>
            {alertMSGForPWD[alertMsgPWDIndex]}
          </Text>
        ) : null}
        <UTextInput
          text={'비밀번호를 재입력해주세요'}
          Icon={<AntDesign name="lock" size={ss(20)} color={'#B2B0B0'} />}
          placeholder={'비밀번호 재입력'}
          value={rePassword}
          handleSetValue={handleSetRePassword}
          maxLength={30}
          handleSetNeedAlert={handleSetNeedAlertRePWD}
          isPassword={true}
          validateValue={validateRePWD}
          isNumeric={false}
        />
        {needAlertRePWD ? (
          <Text style={{color: 'red', marginHorizontal: hs(20)}}>
            {alertMSGForRePWD[alertMsgRePWDIndex]}
          </Text>
        ) : null}
        <LongButton
          isAbled={isAbled}
          handleOnPressBtn={handleOnPressBtn}
          text={btnText}
        />
      </ScrollView>
    </Pressable>
  );
};

export default PasswordAndRePassword;
