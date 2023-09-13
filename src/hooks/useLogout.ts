import axios from 'axios';
import {useDispatch} from 'react-redux';
import {initUserInfo} from 'slice/userSlice';
import {alert} from 'utils/alert';
import * as Keychain from 'react-native-keychain';
import {requestLogOut} from 'api/logout';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';

const useLogout = () => {
  const dispatch = useDispatch();
  const {userId} = useAppSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    const logoutResult = await requestLogOut(userId);
    if (!logoutResult) {
      return;
    }
    await Keychain.resetInternetCredentials('ID');
    await Keychain.resetInternetCredentials('password');
    await Keychain.resetInternetCredentials('refreshToken');
    delete axios.defaults.headers.common.Authorization;
    dispatch(initUserInfo());
    alert({title: '로그아웃 성공', body: '로그아웃 되었습니다!'});
  };

  return {handleLogout, logOut};
};

export default useLogout;
