import React, {useState} from 'react';
import {View} from 'react-native';
import PasswordRePassword from 'components/PasswordAndRePassword';
import {JoinStackProps} from 'navigations/types';

const JoinPassword: React.FC<JoinStackProps> = ({route, navigation}) => {
  const {Email} = route.params as {Email: string};

  const [password, setPassword] = useState('');
  const handleSetPassword = (newValue: string) => {
    setPassword(newValue);
  };
  const [rePassword, setRePassword] = useState('');
  const handleSetRePassword = (newValue: string) => {
    setRePassword(newValue);
  };

  const goNextJoinNavigation = () => {
    navigation.navigate('JoinName', {Email: Email, Password: password});
  };

  const handleOnPressBtn = () => {
    goNextJoinNavigation();
  };

  return (
    <View>
      <PasswordRePassword
        password={password}
        handleSetPassword={handleSetPassword}
        rePassword={rePassword}
        handleSetRePassword={handleSetRePassword}
        handleOnPressBtn={handleOnPressBtn}
        btnText={'다음'}
      />
    </View>
  );
};

export default JoinPassword;
