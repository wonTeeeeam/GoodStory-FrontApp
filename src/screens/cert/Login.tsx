import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {hs, vs, ss} from 'utils/scailing';
import {useDispatch} from 'react-redux';
import {handleIsUserStartJoin} from 'slice/navigationSlice';
import useLogin from 'hooks/useLogin';
import {useEffect} from 'react';
import {showToast} from 'utils/toast';
import LoadingModal from 'components/modal/LoadingModal';
import {AntDesign} from 'utils/react-native-vector-helper';
import logo from 'assets/images/logo.png';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const handlePressLogin = async () => {
    setIsLoading(true);
    await handleLogin();
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingModal isVisible={isLoading} />;
  }

  return (
    <ScrollView
      style={{flex: 1, paddingHorizontal: hs(20)}}
      contentContainerStyle={{flex: 1}}>
      <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
        <View style={{marginTop: vs(60), alignItems: 'center'}}>
          <Image source={logo} style={{width: hs(100), height: vs(100)}} />
        </View>
        <View style={{marginTop: vs(60), alignSelf: 'center'}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            당신의 좋은 회사 경험담
          </Text>
        </View>
        <View style={styles.IdContainerView}>
          <AntDesign name="user" size={ss(20)} color={'#B2B0B0'} />
          <TextInput
            style={styles.IdTextInput}
            placeholder="아이디"
            placeholderTextColor={'#B2B0B0'}
            value={ID}
            onChangeText={onChangeUserId}
            autoCapitalize={'none'}
          />
        </View>

        <View style={styles.passwordContainerView}>
          <AntDesign name="lock" size={ss(20)} color={'#B2B0B0'} />

          <TextInput
            style={styles.passwordTextInput}
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
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    ...styles.isAutoLoginCheckBox,
                    backgroundColor: isAutoLogin ? '#029BFE' : undefined,
                  }}>
                  {isAutoLogin && (
                    <AntDesign name="check" size={ss(18)} color={'white'} />
                  )}
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
        <View style={styles.loginBtnContainerView}>
          <Pressable onPress={handlePressLogin}>
            <View style={styles.loginBtnTextView}>
              <Text style={{fontSize: ss(20)}}>로그인</Text>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  IdContainerView: {
    flexDirection: 'row',
    marginTop: vs(20),
    alignItems: 'center',
    backgroundColor: 'white',
    height: hs(50),
    borderRadius: ss(20),
    paddingLeft: vs(10),
  },
  IdTextInput: {
    flex: 1,
    marginLeft: vs(5),
    borderLeftWidth: ss(1),
    borderColor: '#B2B0B0',
    height: hs(40),
    color: '#B2B0B0',
    paddingLeft: hs(10),
  },
  passwordContainerView: {
    flexDirection: 'row',
    marginTop: vs(20),
    alignItems: 'center',
    backgroundColor: 'white',
    height: hs(50),
    borderRadius: ss(20),
    paddingLeft: vs(10),
  },
  passwordTextInput: {
    flex: 1,
    marginLeft: vs(5),
    borderLeftWidth: ss(1),
    height: hs(40),
    borderColor: '#B2B0B0',
    color: '#B2B0B0',
    paddingLeft: hs(10),
  },
  isAutoLoginCheckBox: {
    borderColor: '#029BFE',
    borderWidth: ss(2),
    borderRadius: ss(5),
    height: vs(20),
    width: hs(20),
  },
  loginBtnContainerView: {
    marginTop: hs(20),
    alignSelf: 'center',
    height: vs(50),
    width: hs(150),
    borderRadius: ss(20),
    backgroundColor: '#029BFE',
  },
  loginBtnTextView: {
    height: vs(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
