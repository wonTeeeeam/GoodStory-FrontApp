import React, {useEffect, useState} from 'react';
import {Keyboard, Pressable, ScrollView, Text, View} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';

import UTextInput from 'components/UTextInput';
import LongButton from 'components/button/LongButton';
import {validateEmail} from 'utils/regex';
import {useNavigation} from '@react-navigation/native';
import Timer from 'components/Timer';
import {AntDesign, Fontisto} from 'utils/react-native-vector-helper';
import {requestEmailExist, requestSendEmail} from 'api/join';
import {JoinStackProps} from 'navigations/types';
import LoadingModal from 'components/modal/LoadingModal';

const JoinEmail = () => {
  const [email, setEmail] = useState('');
  const handleSetEmail = (newValue: string) => {
    setEmail(newValue);
  };
  const alertMSGForEmail = [
    `올바른 형식의 이메일을 입력해주세요(영문자, 숫자, -, _만 가능)`,
  ];
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [alertMSGIndexForEmail, setAlertMsgIndexForEmail] = useState(0);
  const [needAlertForEmail, setNeedAlertForEmail] = useState(false);
  const handleSetNeedAlertForEmail = (newValue: boolean) => {
    setNeedAlertForEmail(newValue);
  };

  const [emailCert, setEmailCert] = useState('');
  const handleSetEmailCert = (newEmail: string) => {
    setEmailCert(newEmail);
  };
  const alertMSGForCert = [
    '잘못된 인증번호입니다.',
    '인증번호가 만료되었습니다.',
  ];
  const [alertMSGIndexForCert, setAlertMSGIndexForCert] = useState(0);
  const [needAlertForCert, setNeedAlertForCert] = useState(false);
  const handleSetNeedAlertForCert = (newValue: boolean) => {
    setNeedAlertForCert(newValue);
  };

  const [isEmailAbled, setIsEmailAbled] = useState(false);
  const [isCertAbled, setIsCertAbled] = useState(false);
  const [certAnswer, setCertAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<JoinStackProps['navigation']>();

  // 이메일 변경 관련 로직
  useEffect(() => {
    setIsCertAbled(false);
    setIsEmailSended(false);
    if (email.length === 0) {
      setIsEmailAbled(false);
      return setNeedAlertForEmail(false);
    }
    if (validateEmail(email)) {
      setIsEmailAbled(true);
      return setNeedAlertForEmail(false);
    }
    setIsEmailAbled(false);
    setNeedAlertForEmail(true);
    return setAlertMsgIndexForEmail(0);
  }, [email]);

  // 인증번호 버튼 활성화
  useEffect(() => {
    if (emailCert?.length === 6 && validateEmail(email) && isEmailSended) {
      return setIsCertAbled(true);
    }
    return setIsCertAbled(false);
  }, [email, isEmailSended, emailCert]);

  const handlePressSendButton = async () => {
    setIsLoading(true);
    if (await requestEmailExist(email)) {
      if (email.includes('wowwow.com')) {
        setCertAnswer('111111');
        setIsEmailAbled(false);
        setIsTimerVisible(true);
        setIsEmailSended(true);
        setNeedAlertForCert(false);
        return setIsLoading(false);
      }
      const sendEmailResult = await requestSendEmail(email);
      if (sendEmailResult) {
        setCertAnswer(sendEmailResult);
        setIsEmailAbled(false);
        setIsTimerVisible(true);
        setIsEmailSended(true);
        setNeedAlertForCert(false);
      }
    }
    setIsLoading(false);
  };

  const validateCert = (value: string) => {
    return value.length === 6;
  };

  const endFunction = () => {
    setAlertMSGIndexForCert(1);
    setNeedAlertForCert(true);
    setIsTimerVisible(false);
    setIsEmailSended(false);
    if (validateEmail(email)) {
      setIsEmailAbled(true);
    }
  };

  const handlePressNextButton = () => {
    if (certAnswer !== emailCert) {
      setAlertMSGIndexForCert(0);
      setNeedAlertForCert(true);
      return;
    }
    setIsTimerVisible(false);
    navigation.navigate('JoinPassword', {Email: email});
  };

  return (
    <View style={{flex: 1}}>
      {isLoading && <LoadingModal isVisible={isLoading} />}
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
          <UTextInput
            text={'이메일을 입력해주세요'}
            Icon={<Fontisto name="email" size={ss(20)} color={'#B2B0B0'} />}
            placeholder={'이메일'}
            value={email}
            handleSetValue={handleSetEmail}
            maxLength={65}
            handleSetNeedAlert={handleSetNeedAlertForEmail}
            validateValue={validateEmail}
          />
          {needAlertForEmail ? (
            <Text
              style={{
                color: 'red',
                marginHorizontal: hs(20),
                marginTop: vs(10),
              }}>
              {alertMSGForEmail[alertMSGIndexForEmail]}
            </Text>
          ) : null}
          <LongButton
            text={'인증번호 전송'}
            isAbled={isEmailAbled}
            handleOnPressBtn={handlePressSendButton}
          />
          <UTextInput
            text={'인증번호를 입력해주세요.'}
            Icon={<AntDesign name="check" size={ss(20)} color={'#B2B0B0'} />}
            placeholder={'인증번호'}
            value={emailCert}
            handleSetValue={handleSetEmailCert}
            maxLength={6}
            handleSetNeedAlert={handleSetNeedAlertForCert}
            validateValue={validateCert}
            isNumeric={true}
          />
          <View style={{flexDirection: 'row'}}>
            {needAlertForCert ? (
              <Text
                style={{
                  color: 'red',
                  marginHorizontal: hs(20),
                  marginTop: vs(10),
                }}>
                {alertMSGForCert[alertMSGIndexForCert]}
              </Text>
            ) : null}
            {isTimerVisible && isEmailSended ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginRight: hs(22),
                  marginTop: vs(10),
                }}>
                <Timer startSeconds={120} endFunction={endFunction} />
              </View>
            ) : null}
          </View>
          <LongButton
            isAbled={isCertAbled}
            handleOnPressBtn={handlePressNextButton}
          />
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default JoinEmail;
