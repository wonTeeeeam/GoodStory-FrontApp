import React, {useState} from 'react';
import {View} from 'react-native';
import PasswordRePassword from 'components/PasswordAndRePassword';

function JoinPassword({route, navigation}) {
  const {Email} = route.params;

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const goNextJoinNavigation = () => {
    navigation.navigate('JoinName', {Email: Email, Password: password});
  };

  const onPress = () => {
    goNextJoinNavigation();
  };

  return (
    <View>
      <PasswordRePassword
        password={password}
        setPassword={setPassword}
        rePassword={rePassword}
        setRePassword={setRePassword}
        onPress={onPress}
        btnText={'다음'}
      />
    </View>
  );
}

export default JoinPassword;
