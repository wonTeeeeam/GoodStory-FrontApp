import axios from 'axios';
import LoadingModal from 'components/LoadingModal';
import PasswordRePassword from 'components/PasswordRePassword';
import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {alert} from 'utils/alert';
import * as Keychain from 'react-native-keychain';
import useApi from 'hooks/useApi';

function ResetPassword({route}) {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const {account} = route.params;
  const {isLoading, handleApi} = useApi();

  const asyncMethod = async () => {
    const result = await axios.patch('/auth/changePassword', {
      Account: account,
      changePassword: password,
    });
  };

  const onSuccess = async () => {
    const existedPassword = await Keychain.getInternetCredentials('password');
    if (existedPassword) {
      await Keychain.setInternetCredentials('password', 'password', password);
    }
    alert({title: '비밀번호 변경', body: '비밀번호가 변경되었습니다'});
  };

  const onError = () => {
    alert({
      title: '비밀번호 변경 실패',
      body: '비밀번호 변경에 실패했습니다.\n잠시후에 다시 시도해주세요.',
    });
  };

  const onPress = async () => {
    handleApi(asyncMethod, onSuccess, onError);
  };

  return (
    <View>
      <PasswordRePassword
        password={password}
        setPassword={setPassword}
        rePassword={rePassword}
        setRePassword={setRePassword}
        onPress={onPress}
        btnText={'비밀번호 재설정'}
      />
      <LoadingModal isVisible={isLoading} />
    </View>
  );
}

export default ResetPassword;
