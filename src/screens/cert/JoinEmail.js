import React, {useEffect, useState} from 'react';
import {Keyboard, Pressable, ScrollView, Text, View} from 'react-native';
import {hs, ss, vs} from 'utils/scailing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JoinTextInput from 'components/JoinTextInput';
import JoinButton from 'components/JoinButton';
import {validateEmail} from 'utils/regex';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Timer from 'components/Timer';
import {alert} from 'utils/alert';

function JoinEmail() {
  const [email, setEmail] = useState('');
  const alertMSGForEmail = [
    `올바른 형식의 이메일을 입력해주세요(영문자, 숫자, -, _만 가능)`,
  ];
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [alertMSGIndexForEmail, setAlertMsgIndexForEmail] = useState(0);
  const [needAlertForEmail, setNeedAlertForEmail] = useState(false);

  const [emailCert, setEmailCert] = useState(false);
  const alertMSGForCert = [
    '잘못된 인증번호입니다.',
    '인증번호가 만료되었습니다.',
  ];
  const [alertMSGIndexForCert, setAlertMSGIndexForCert] = useState(0);
  const [needAlertForCert, setNeedAlertForCert] = useState(false);

  const [isEmailAbled, setIsEmailAbled] = useState(false);
  const [isCertAbled, setIsCertAbled] = useState(false);
  const navigation = useNavigation();

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
    if (emailCert.length === 6 && validateEmail(email) && isEmailSended) {
      return setIsCertAbled(true);
    }
    return setIsCertAbled(false);
  }, [emailCert, email, isEmailSended]);

  const checkEmailExist = async () => {
    try {
      const result = await axios.post('/user/validateEmail', {
        Account: email,
      });
      if (!result.data) {
        return true;
      } else {
        alert({title: '이메일 중복', body: '이미 존재하는 이메일입니다.'});
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const sendEmail = async () => {
    try {
      const result = await axios.post('/mail/authEmail', {});
      if (!result.data) {
        alert({title: '이메일 전송 실패', body: '이메일 전송에 실패했습니다.'});
        return false;
      } else {
        return true;
      }
    } catch (e) {
      return false;
    }
  };

  const handlePressSendButton = async () => {
    try {
      if (await checkEmailExist()) {
        // if (await sendEmail()) {
        setIsEmailAbled(false);
        setIsTimerVisible(true);
        setIsEmailSended(true);
        setNeedAlertForCert(false);
        // }
      }
    } catch (e) {}
  };

  const validateCert = value => {
    if (value.lenth === 6) {
      return true;
    }
    return false;
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
    setIsTimerVisible(false);
    navigation.navigate('JoinPassword', {Email: email});
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
          <JoinTextInput
            text={'이메일을 입력해주세요'}
            Icon={<Fontisto name="email" size={ss(20)} color={'#B2B0B0'} />}
            placeholder={'이메일'}
            value={email}
            setValue={setEmail}
            maxLength={65}
            setNeedAlert={setNeedAlertForEmail}
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
          <JoinButton
            text={'인증번호 전송'}
            isAbled={isEmailAbled}
            onPress={handlePressSendButton}
          />
          <JoinTextInput
            text={'인증번호를 입력해주세요.'}
            Icon={<AntDesign name="check" size={ss(20)} color={'#B2B0B0'} />}
            placeholder={'인증번호'}
            value={emailCert}
            setValue={setEmailCert}
            maxLength={6}
            setNeedAlert={setNeedAlertForCert}
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
                <Timer startSeconds={20} endFunction={endFunction} />
              </View>
            ) : null}
          </View>
          <JoinButton isAbled={isCertAbled} onPress={handlePressNextButton} />
        </Pressable>
      </ScrollView>
    </View>
  );
}

export default JoinEmail;
