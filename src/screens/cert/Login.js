import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {hs, vs, ss} from '../../utils/scailing';
import AntDesign from 'react-native-vector-icons/AntDesign';

import axios from 'axios';

import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {handleIsUserStartJoin} from '../../slice/userSlice';

function Login() {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [isSaveID, setIsSaveID] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  const dispatch = useDispatch();

  /**
   * ID 입력값 변경
   */
  const onChangeUserId = value => {
    setID(value);
  };

  /**
   * password 입력값 변경
   */
  const onChangeUserPassword = value => {
    setPassword(value);
  };

  /**
   * 아이디 저장 FLAG 변경
   */
  const onChangeSaveID = value => {
    setIsSaveID(value);
  };

  /**
   * 자동 로그인 FLAG 변경
   */
  const onChangeAutoLogin = value => {
    setIsAutoLogin(value);
  };

  /**
   * 로그인 버튼 클릭
   */
  const handleLogin = async () => {
    if (ID === '' || password === '') {
      return;
    }

    try {
      const result = await axios.post(`/auth/login`, {
        Account: ID,
        Password: password,
      });

      await Keychain.setInternetCredentials(
        'accessToken',
        'accessToken',
        result.data.access_token,
      );

      await Keychain.setInternetCredentials(
        'refreshToken',
        'refreshToken',
        result.data.refresh_token,
      );
      axios.defaults.headers.common['Authorization'] = result.data.access_token;
    } catch (error) {}
  };

  /**
   * 회원가입 버튼 클릭
   */
  const onSignUp = () => {};

  /**
   * 아이디 / 비밀번호 찾기 버튼 클릭
   */
  const onFindUserInfo = () => {};

  return (
    <View
      style={{flex: 1, backgroundColor: '#5A4FCF', paddingHorizontal: hs(20)}}>
      <View style={{flex: 1}}>
        <View style={{marginTop: vs(200), alignSelf: 'center'}}>
          <Text style={{color: 'white', fontWeight: '200'}}>
            당신의 좋같은 회사 경험담
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: vs(20),
            alignItems: 'center',
            backgroundColor: 'white',
            height: hs(50),
            borderRadius: ss(20),
          }}>
          <AntDesign name="user" size={ss(20)} color={'black'} />

          <TextInput
            style={{
              flex: 1,
              marginLeft: vs(5),
              borderLeftWidth: ss(1),
              height: hs(40),
            }}
            placeholder="아이디"
            placeholderTextColor={'red'}
            value={ID}
            onChangeText={onChangeUserId}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: vs(20),
            alignItems: 'center',
            backgroundColor: 'white',
            height: hs(50),
            borderRadius: ss(20),
          }}>
          <AntDesign name="lock" size={ss(20)} color={'black'} />

          <TextInput
            style={{
              flex: 1,
              marginLeft: vs(5),
              borderLeftWidth: ss(1),
              height: hs(40),
            }}
            placeholder="비밀번호"
            secureTextEntry={true}
            placeholderTextColor={'red'}
            value={password}
            onChangeText={onChangeUserPassword}
          />
        </View>
        <View
          style={{flexDirection: 'row', marginTop: hs(20), marginLeft: hs(20)}}>
          <View style={{flexDirection: 'row'}}>
            <Pressable onPress={() => setIsSaveID(!isSaveID)}>
              <View
                style={{
                  borderColor: 'blue',
                  borderWidth: ss(2),
                  borderRadius: ss(5),
                  height: vs(20),
                  width: hs(20),
                  backgroundColor: isSaveID ? 'blue' : null,
                }}>
                {isSaveID ? (
                  <AntDesign name="check" size={ss(18)} color={'black'} />
                ) : null}
              </View>
            </Pressable>
            <View style={{marginLeft: hs(10)}}>
              <Text>아이디 저장</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginLeft: hs(20)}}>
            <Pressable onPress={() => setIsAutoLogin(!isAutoLogin)}>
              <View
                style={{
                  borderColor: 'blue',
                  borderWidth: ss(2),
                  borderRadius: ss(5),
                  height: vs(20),
                  width: hs(20),
                  backgroundColor: isAutoLogin ? 'blue' : null,
                }}>
                {isAutoLogin ? (
                  <AntDesign name="check" size={ss(18)} color={'black'} />
                ) : null}
              </View>
            </Pressable>
            <View style={{marginLeft: hs(10)}}>
              <Text>자동 로그인</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: hs(20),
            alignSelf: 'center',
            borderWidth: ss(1),
            height: vs(50),
            width: hs(150),
            borderRadius: ss(20),
            backgroundColor: 'blue',
          }}>
          <Pressable onPress={handleLogin}>
            <View
              style={{
                height: vs(45),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>로그인</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: hs(10),
          marginBottom: vs(40),
          flexDirection: 'row',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
        }}>
        <Pressable onPress={() => dispatch(handleIsUserStartJoin())}>
          <Text>회원가입</Text>
        </Pressable>

        <View style={{borderLeftWidth: ss(1)}} />
        <Text>아이디 찾기</Text>
        <View style={{borderLeftWidth: ss(1)}} />
        <Text>비밀번호 재설정</Text>
      </View>
    </View>
  );
}

export default Login;
