import axios from 'axios';
import LoadingModal from 'components/LoadingModal';
import PasswordRePassword from 'components/PasswordRePassword';
import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {alert} from 'utils/alert';
import * as Keychain from 'react-native-keychain';

function ResetPassword({route}) {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {account} = route.params;

  const onPress = async () => {
    try {
      setIsLoading(true);
      const result = await axios.patch('/auth/changePassword', {
        Account: account,
        changePassword: password,
      });
      const existedPassword = await Keychain.getInternetCredentials('password');
      if (existedPassword) {
        await Keychain.setInternetCredentials('password', 'password', password);
      }
      setIsLoading(false);
      alert({title: '비밀번호 변경', body: '비밀번호가 변경되었습니다'});
    } catch (e) {
      setIsLoading(false);
      console.log(e.response);
      alert({
        title: '비밀번호 변경 실패',
        body: '비밀번호 변경에 실패했습니다.\n잠시후에 다시 시도해주세요.',
      });
    }
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
