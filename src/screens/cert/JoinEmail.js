import React, {useEffect, useState} from 'react';
import {Keyboard, Pressable, ScrollView, Text, View} from 'react-native';
import {hs, ss} from 'utils/scailing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import JoinTextInput from 'components/JoinTextInput';
import JoinButton from 'components/JoinButton';
import {validateEmail} from 'utils/regex';
import CommonModal from 'components/CommonMocal';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Timer from 'components/Timer';

function JoinEmail() {
  const [email, setEmail] = useState('');
  const alertMSGForEmail = [
    `올바른 형식의 이메일을 입력해주세요(영문자, 숫자, -, _만 가능)`,
    '65자 이상은 불가합니다.',
  ];
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [alertMSGIndexForEmail, setAlertMsgIndexForEmail] = useState(0);
  const [needAlertForEmail, setNeedAlertForEmail] = useState(false);

  const [emailCert, setEmailCert] = useState(false);
  const alertMSGForCert = [
    '잘못된 인증번호입니다.',
    '인증번호가 만료되었습니다.',
  ];
  const [alertMSGIndexForCert, setAlertMSGIndexForCert] = useState(0);
  const [needAlertForCert, setNeedAlertForCert] = useState(false);

  const [isAbled, setIsAbled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (email.length > 64) {
      setIsAbled(false);
      setNeedAlertForEmail(true);
      return setAlertMsgIndexForEmail(1);
    }
    if (email.length === 0) {
      setIsAbled(false);
      return setNeedAlertForEmail(false);
    }
    if (validateEmail(email)) {
      setIsAbled(true);
      return setNeedAlertForEmail(false);
    }
    setIsAbled(false);
    setNeedAlertForEmail(true);
    return setAlertMsgIndexForEmail(0);
  }, [email]);

  const checkEmailExist = async () => {
    try {
      const result = await axios.post('/user/validateEmail', {
        Account: email,
      });
      if (!result.data) {
        navigation.navigate('JoinPassword', {Email: email});
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1}}>
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
            setNeedAlertForEmail={setNeedAlertForEmail}
            validateValue={validateEmail}
          />
          {isTimerVisible ? <Timer startSeconds={10} /> : null}
          <JoinButton
            text={'인증번호 전송'}
            isAbled={isAbled}
            onPress={() => {
              setIsTimerVisible(true);
            }}
          />
          {needAlertForEmail ? (
            <Text style={{color: 'red', marginHorizontal: hs(20)}}>
              {alertMSGForEmail[alertMSGIndexForEmail]}
            </Text>
          ) : null}
          <JoinTextInput
            text={'인증번호를 입력해주세요.'}
            Icon={<AntDesign name="check" size={ss(20)} color={'#B2B0B0'} />}
            placeholder={'인증번호'}
            value={email}
            setValue={setEmail}
            maxLength={65}
            setNeedAlertForEmail={setNeedAlertForEmail}
            validateValue={validateEmail}
          />

          {needAlertForEmail ? (
            <Text style={{color: 'red', marginHorizontal: hs(20)}}>
              {alertMSGForEmail[alertMSGIndexForEmail]}
            </Text>
          ) : null}
          <JoinButton isAbled={isAbled} onPress={checkEmailExist} />
        </ScrollView>
      </Pressable>
      <CommonModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title={'이메일 중복'}
        body={'이미 존재하는 이메일입니다.'}
      />
    </View>
  );
}

export default JoinEmail;
