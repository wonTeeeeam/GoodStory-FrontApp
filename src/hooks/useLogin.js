import axios from 'axios';
import {useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {handleAccessToken} from 'slice/userSlice';

function useLogin() {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(true);
  const dispatch = useDispatch();

  const onChangeUserId = value => {
    setID(value);
  };

  const onChangeUserPassword = value => {
    setPassword(value);
  };

  const onChangeIsAutoLogin = () => {
    setIsAutoLogin(!isAutoLogin);
  };

  const handleLogin = async (ID, password) => {
    if (ID === '' || password === '') {
      return;
    }
    try {
      const result = await axios.post('/auth/login', {
        Account: ID,
        Password: password,
      });
      if (isAutoLogin) {
        await Keychain.setInternetCredentials('ID', 'ID', ID);
        await Keychain.setInternetCredentials('password', 'password', password);
      }
      axios.defaults.headers.common.Authorization = `Bearer ${result.data.access_token}`;
      await Keychain.setInternetCredentials(
        'refreshToken',
        'refreshToken',
        result.data.refresh_token,
      );
      dispatch(handleAccessToken(result.data.access_token));
    } catch (error) {
      console.log(error);
    }
  };
  return {
    ID,
    password,
    isAutoLogin,
    onChangeUserId,
    onChangeUserPassword,
    onChangeIsAutoLogin,
    handleLogin,
  };
}

export default useLogin;
