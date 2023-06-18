import PasswordRePassword from 'components/PasswordRePassword';
import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const onPress = () => {};

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
    </View>
  );
}

export default ResetPassword;
