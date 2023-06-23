import axios from 'axios';
import {useEffect} from 'react';

import {DialogStatic} from '@/utils/dialog';

import useLogout from '../features/user/hooks/useLogout';

const useAxiosInterceptor = () => {
  const {handleLogout} = useLogout();

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
        if (err.response?.status === 401) {
          DialogStatic.alert({
            title: '접근 권한 없습니다',
            desc: `접근 권한이 없습니다.\n서비스 이용을 위해 다시 로그인 해주세요.`,
          });
          await handleLogout();
        }
        return Promise.reject(err);
      },
    );
  }, [handleLogout]);
};

export default useAxiosInterceptor;
