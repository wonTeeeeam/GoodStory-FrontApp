import {requestUserInfo} from 'api/login';
import {useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {handleUserInfo} from 'slice/userSlice';
import {alert} from 'utils/alert';

const useLogin = () => {
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

  const handleSetUserInfo = async result => {
    await Keychain.setInternetCredentials(
      'refreshToken',
      'refreshToken',
      result.data.refresh_token,
    );
    dispatch(handleUserInfo(result.data));
  };

  const handleAutoLogin = async () => {
    const IDCredentials = await Keychain.getInternetCredentials('ID');
    const passwordCredentials = await Keychain.getInternetCredentials(
      'password',
    );
    if (IDCredentials.password && passwordCredentials.password) {
      const loginUserInfo = await requestUserInfo(
        IDCredentials.password,
        passwordCredentials.password,
      );
      if (!loginUserInfo) {
        return alert({
          title: '자동 로그인 실패',
          body: '자동 로그인에 실패했습니다.',
        });
      }
      handleSetUserInfo(loginUserInfo);
    }
  };

  const handleLogin = async () => {
    if (ID === '' || password === '') {
      return;
    }
    const loginUserInfo = await requestUserInfo(ID, password);
    if (!loginUserInfo) {
      return alert({
        title: '로그인 실패',
        body: '로그인에 실패했습니다.',
      });
    }
    if (isAutoLogin) {
      await Keychain.setInternetCredentials('ID', 'ID', ID);
      await Keychain.setInternetCredentials('password', 'password', password);
    }
    await handleSetUserInfo(loginUserInfo);
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
};

export default useLogin;
