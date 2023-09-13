import axios from 'axios';
import {alert} from 'utils/alert';

export const requestLogOut = async (userId: string) => {
  try {
    await axios.patch('/auth/logout', {
      userId,
    });
    return true;
  } catch (error: any) {
    alert({title: '로그아웃 실패', body: error});
    return false;
  }
};
