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
  const {isLoading, handleApi} = useApi();
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

  const asyncMethod = async (Id, Password) => {
    const result = await axios.post('/auth/login', {
      Account: Id ? Id : ID,
      Password: Password ? Password : password,
    });
  };

  const onSuccess = async result => {
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
    dispatch(handleUserInfo(result.data));
  };

  const onError = error => {
    alert({
      title: '로그인 실패',
      body: error.response,
    });
  };

  const handleLogin = async (ID, password) => {
    if (ID === '' || password === '') {
      return;
    }
    await handleApi(asyncMethod, onSuccess, onError);
    // try {
    //   const result = await axios.post('/auth/login', {
    //     Account: ID,
    //     Password: password,
    //   });
    //   if (isAutoLogin) {
    //     await Keychain.setInternetCredentials('ID', 'ID', ID);
    //     await Keychain.setInternetCredentials('password', 'password', password);
    //   }
    //   axios.defaults.headers.common.Authorization = `Bearer ${result.data.access_token}`;
    //   await Keychain.setInternetCredentials(
    //     'refreshToken',
    //     'refreshToken',
    //     result.data.refresh_token,
    //   );
    //   dispatch(handleUserInfo(result.data));
    // } catch (error) {
    //   console.log(error.response);
    //   alert({
    //     title: '로그인 실패',
    //     body: error.response,
    //   });
    //   console.log(error);
    // }
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
  };
}

export default useLogin;
