import axios from 'axios';
import {alert} from 'utils/alert';

export const requestLogOut = async (userId: string) => {
  try {
    await axios.patch('/auth/logout', {
      UserId: userId,
    });
    return true;
  } catch (error: any) {
    alert({
      title: '로그아웃 실패',
      body:
        error?.message ||
        '알 수 없는 이유로 로그아웃에 실패하였습니다. 관리자에게 문의해주세요',
    });
    return false;
  }
};
