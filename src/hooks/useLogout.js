import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {useDispatch} from 'react-redux';
import {handleUserInfo, initUserInfo} from 'slice/userSlice';

function useLogout() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await Keychain.resetInternetCredentials('ID');
      await Keychain.resetInternetCredentials('password');
      await Keychain.resetInternetCredentials('refreshToken');
      delete axios.defaults.headers.common.Authorization;
      dispatch(initUserInfo());
    } catch (e) {
      console.log(e);
    }
  };
  return {handleLogout};
}

export default useLogout;
