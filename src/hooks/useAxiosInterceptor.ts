import axios from 'axios';
import {useEffect} from 'react';

import {alert} from 'utils/alert';
import * as Keychain from 'react-native-keychain';
import useLogout from './useLogout';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';

const useAxiosInterceptor = () => {
  const {handleLogout} = useLogout();

  const {userId} = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    axios.interceptors.response.use(
      async response => {
        const authorization = response.headers['authorization'];
        if (authorization) {
          const token = authorization.replace(/^Bearer\s+/, '');
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return response;
      },
      async err => {
        if (err.response?.status === 401 && err.response?.error === 'access') {
          const refresh_token: Keychain.SharedWebCredentials =
            await Keychain.getInternetCredentials('ID').password;
          return await axios.patch('/user/updateToken', {
            UserId: userId,
            refresh_token,
          });
        } else if (
          err.response?.status === 401 &&
          err.response?.error === 'refresh'
        ) {
          alert({
            title: '로그인 유효기간 만료',
            body: '로그인 유효기간이 만료되었습니다.\n재로그인이 필요합니다.',
          });
          await handleLogout();
        }
        return Promise.reject(err);
      },
    );
  }, [handleLogout, userId]);
};

export default useAxiosInterceptor;
