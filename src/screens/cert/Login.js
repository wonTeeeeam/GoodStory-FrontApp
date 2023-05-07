import React, {useState} from 'react';
import {Keyboard, Pressable, Text, TextInput, View} from 'react-native';
import {hs, vs, ss} from '../../utils/scailing';
import AntDesign from 'react-native-vector-icons/AntDesign';

import axios from 'axios';

import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {handleIsUserStartJoin} from '../../slice/userSlice';

function Login() {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
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
      if (isAutoLogin) {
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
      }
      axios.defaults.headers.common['Authorization'] = result.data.access_token;
    } catch (error) {}
  };

  return (
    <View
      style={{flex: 1, backgroundColor: '#4B02FE', paddingHorizontal: hs(20)}}>
      <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
        <View style={{marginTop: vs(200), alignSelf: 'center'}}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
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
            paddingLeft: vs(10),
          }}>
          <AntDesign name="user" size={ss(20)} color={'#B2B0B0'} />

          <TextInput
            style={{
              flex: 1,
              marginLeft: vs(5),
              borderLeftWidth: ss(1),
              borderColor: '#B2B0B0',
              height: hs(40),
              color: '#B2B0B0',
            }}
            placeholder="아이디"
            placeholderTextColor={'#B2B0B0'}
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
            paddingLeft: vs(10),
          }}>
          <AntDesign name="lock" size={ss(20)} color={'#B2B0B0'} />

          <TextInput
            style={{
              flex: 1,
              marginLeft: vs(5),
              borderLeftWidth: ss(1),
              height: hs(40),
              borderColor: '#B2B0B0',
              color: '#B2B0B0',
            }}
            placeholder="비밀번호"
            secureTextEntry={true}
            placeholderTextColor={'#B2B0B0'}
            value={password}
            onChangeText={onChangeUserPassword}
          />
        </View>
        <View style={{marginTop: hs(20)}}>
          <View style={{marginLeft: hs(20)}}>
            <Pressable
              onPress={() => setIsAutoLogin(!isAutoLogin)}
              style={{
                flexDirection: 'row',
                width: vs(100),
              }}>
              <View
                style={{
                  borderColor: '#029BFE',
                  borderWidth: ss(2),
                  borderRadius: ss(5),
                  height: vs(20),
                  width: hs(20),
                  backgroundColor: isAutoLogin ? '#029BFE' : null,
                }}>
                {isAutoLogin ? (
                  <AntDesign name="check" size={ss(18)} color={'white'} />
                ) : null}
              </View>
              <View style={{marginLeft: hs(10)}}>
                <Text style={{color: '#029BFE'}}>자동 로그인</Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: hs(20),
            alignSelf: 'center',
            height: vs(50),
            width: hs(150),
            borderRadius: ss(20),
            backgroundColor: '#029BFE',
          }}>
          <Pressable onPress={handleLogin}>
            <View
              style={{
                height: vs(45),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: ss(20)}}>로그인</Text>
            </View>
          </Pressable>
        </View>
      </Pressable>
      <View
        style={{
          marginHorizontal: hs(10),
          marginBottom: vs(40),
          alignSelf: 'center',
        }}>
        <Text style={{color: 'white'}}>아직 회원이 아니신가요?</Text>
        <Pressable onPress={() => dispatch(handleIsUserStartJoin())}>
          <Text
            style={{
              borderBottomWidth: ss(1),
              borderBottomColor: 'white',
              color: 'white',
              alignSelf: 'center',
            }}>
            회원가입 바로가기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Login;
