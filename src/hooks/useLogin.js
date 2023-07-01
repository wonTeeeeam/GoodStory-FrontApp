import axios from 'axios';
import {useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {handleUserInfo} from 'slice/userSlice';
import {alert} from 'utils/alert';
import useApi from './useApi';

function useLogin() {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(true);
  const {isLoading, handleAsyncMethod} = useApi();
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

  const fetchUserInfo = async () => {
    return await axios.post('/auth/login', {
      Account: ID,
      Password: password,
    });
  };

  const handleSetUserInfo = async result => {
    axios.defaults.headers.common.Authorization = `Bearer ${result.data.access_token}`;
    await Keychain.setInternetCredentials(
      'refreshToken',
      'refreshToken',
      result.data.refresh_token,
    );
    dispatch(handleUserInfo(result.data));
  };

  const onLoginSuccess = async result => {
    if (isAutoLogin) {
      await Keychain.setInternetCredentials('ID', 'ID', ID);
      await Keychain.setInternetCredentials('password', 'password', password);
    }
    await handleSetUserInfo(result);
  };

  const onError = error => {
    alert({
      title: '로그인 실패',
      body: error,
    });
  };

  const handleAutoLogin = async () => {
    const IDCredentials = await Keychain.getInternetCredentials('ID');
    const passwordCredentials = await Keychain.getInternetCredentials(
      'password',
    );
    if (IDCredentials.password && passwordCredentials.password) {
      const fetchUserInfo = async () => {
        return await axios.post('/auth/login', {
          Account: IDCredentials.password,
          Password: passwordCredentials.password,
        });
      };
      await handleAsyncMethod(fetchUserInfo, handleSetUserInfo, onError);
    }
  };

  const handleLogin = async () => {
    if (ID === '' || password === '') {
      return;
    }
    await handleAsyncMethod(fetchUserInfo, onLoginSuccess, onError);
  };

  return {
    ID,
    password,
    isAutoLogin,
    isLoading,
    onChangeUserId,
    onChangeUserPassword,
    onChangeIsAutoLogin,
    handleLogin,
    handleAutoLogin,
  };
}

export default useLogin;
