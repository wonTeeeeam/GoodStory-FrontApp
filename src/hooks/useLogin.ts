import {LoginUserInfo, requestUserInfo} from 'api/login';
import {useState} from 'react';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {handleUserInfo} from 'slice/userSlice';
import {alert} from 'utils/alert';

type keyChainValueObject = {
  storage: string;
  password: string;
  username: string;
  service: string;
};

const useLogin = () => {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(true);
  const dispatch = useDispatch();

  const onChangeUserId = (value: string) => {
    setID(value);
  };

  const onChangeUserPassword = (value: string) => {
    setPassword(value);
  };

  const onChangeIsAutoLogin = () => {
    setIsAutoLogin(!isAutoLogin);
  };

  const handleSetUserInfo = async (loginUserInfo: LoginUserInfo) => {
    await Keychain.setInternetCredentials(
      'refreshToken',
      'refreshToken',
      loginUserInfo.refresh_token,
    );
    dispatch(handleUserInfo(loginUserInfo));
  };

  const handleAutoLogin = async () => {
    let autoLoginResult = false;
    const IDCredentials: keyChainValueObject | false =
      await Keychain.getInternetCredentials('ID');
    const passwordCredentials: keyChainValueObject | false =
      await Keychain.getInternetCredentials('password');

    if (
      IDCredentials &&
      IDCredentials?.password &&
      passwordCredentials &&
      passwordCredentials.password
    ) {
      const loginUserInfo = await requestUserInfo(
        IDCredentials.password,
        passwordCredentials.password,
      );
      if (loginUserInfo) {
        handleSetUserInfo(loginUserInfo);
        autoLoginResult = true;
      }
    }
    if (!autoLoginResult) {
      alert({title: '자동로그인 실패', body: '자동 로그인 실패하였습니다.'});
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
    onChangeUserId,
    onChangeUserPassword,
    onChangeIsAutoLogin,
    handleLogin,
    handleAutoLogin,
  };
};

export default useLogin;
