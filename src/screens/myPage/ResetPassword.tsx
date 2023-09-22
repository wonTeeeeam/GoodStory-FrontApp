import LoadingModal from 'components/modal/LoadingModal';
import PasswordRePassword from 'components/PasswordAndRePassword';
import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {alert} from 'utils/alert';
import * as Keychain from 'react-native-keychain';
import {requestPatchPassword} from 'api/myPage';
import {MyPageStackProps} from 'navigations/types';

const ResetPassword: React.FC<MyPageStackProps> = ({route}) => {
  const [password, setPassword] = useState('');
  const handleSetPassword = (newValue: string) => {
    setPassword(newValue);
  };
  const [rePassword, setRePassword] = useState('');
  const handleSetRePassword = (newValue: string) => {
    setRePassword(newValue);
  };
  const [isLoading, setIsLoading] = useState(false);

  const {account} = route.params as {account: string};

  const handleOnPressBtn = async () => {
    setIsLoading(true);
    const patchPasswordResult = await requestPatchPassword(account, password);
    setIsLoading(false);
    if (!patchPasswordResult) {
      return;
    }
    const existedPassword = await Keychain.getInternetCredentials('password');
    if (existedPassword) {
      await Keychain.setInternetCredentials('password', 'password', password);
    }
    alert({title: '비밀번호 변경', body: '비밀번호가 변경되었습니다'});
  };

  if (isLoading) {
    return <LoadingModal isVisible={isLoading} />;
  }

  return (
    <View>
      <PasswordRePassword
        password={password}
        handleSetPassword={handleSetPassword}
        rePassword={rePassword}
        handleSetRePassword={handleSetRePassword}
        handleOnPressBtn={handleOnPressBtn}
        btnText={'비밀번호 재설정'}
      />
    </View>
  );
};

export default ResetPassword;
