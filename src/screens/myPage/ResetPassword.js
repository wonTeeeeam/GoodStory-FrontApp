import axios from 'axios';
import LoadingModal from 'components/LoadingModal';
import PasswordRePassword from 'components/PasswordRePassword';
import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

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
      console.log(result);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e.response);
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
