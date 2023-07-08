import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {useDispatch, useSelector} from 'react-redux';
import {handleUserInfo, initUserInfo} from 'slice/userSlice';
import useApi from './useApi';
import {alert} from 'utils/alert';

function useLogout() {
  const dispatch = useDispatch();
  const {handleAsyncMethod} = useApi();
  const {userId} = useSelector(state => state.user);

  const onSuccessLogout = result => {
    alert({title: '로그아웃 성공', body: '로그아웃 되었습니다!'});
  };

  const onErrorLogout = error => {
    alert({title: '로그아웃 실패', body: error});
  };

  const logOut = async () => {
    await axios.patch('/auth/logout', {
      userId,
    });
    await Keychain.resetInternetCredentials('ID');
    await Keychain.resetInternetCredentials('password');
    await Keychain.resetInternetCredentials('refreshToken');
    delete axios.defaults.headers.common.Authorization;
    dispatch(initUserInfo());
    return true;
  };

  const handleLogout = async () => {
    await handleAsyncMethod(logOut, onSuccessLogout, onErrorLogout);
  };

  return {handleLogout, logOut};
}

export default useLogout;
