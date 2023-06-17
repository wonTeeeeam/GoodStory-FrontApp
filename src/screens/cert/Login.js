import React, {useState} from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {hs, vs, ss} from 'utils/scailing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {handleIsUserStartJoin} from 'slice/navigationSlice';
import useLogin from 'hooks/useLogin';
import {useEffect} from 'react';
import {showToast} from 'utils/toast';

function Login() {
  const dispatch = useDispatch();
  const {
    ID,
    password,
    isAutoLogin,
    onChangeUserId,
    onChangeUserPassword,
    onChangeIsAutoLogin,
    handleLogin,
  } = useLogin();

  useEffect(() => {
    showToast('로그인이 필요한 서비스입니다.');
  }, []);

  return (
    <ScrollView
      style={{flex: 1, paddingHorizontal: hs(20)}}
      contentContainerStyle={{flex: 1}}>
      <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
        <View style={{marginTop: vs(200), alignSelf: 'center'}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
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
              paddingLeft: hs(10),
            }}
            placeholder="아이디"
            placeholderTextColor={'#B2B0B0'}
            value={ID}
            onChangeText={onChangeUserId}
            autoCapitalize={'none'}
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
              paddingLeft: hs(10),
            }}
            placeholder="비밀번호"
            secureTextEntry={true}
            placeholderTextColor={'#B2B0B0'}
            value={password}
            onChangeText={onChangeUserPassword}
            autoCapitalize={'none'}
          />
        </View>
        <View style={{marginTop: hs(20)}}>
          <View style={{marginHorizontal: hs(10)}}>
            <Pressable
              onPress={() => onChangeIsAutoLogin()}
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                // backgroundColor: 'red',
              }}>
              <View style={{flexDirection: 'row'}}>
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
              </View>
              <Pressable onPress={() => dispatch(handleIsUserStartJoin())}>
                <Text
                  style={{
                    color: '#029BFE',
                    alignSelf: 'center',
                  }}>
                  회원가입
                </Text>
              </Pressable>
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
          <Pressable
            onPress={async () => {
              await handleLogin(ID, password);
            }}>
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
    </ScrollView>
  );
}

export default Login;
