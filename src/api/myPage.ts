import axios from 'axios';
import {alert} from 'utils/alert';

export const requestMyPageUserData = async (userId: string) => {
  try {
    const userData = await axios.get('/user/myPage', {
      params: {
        UserId: userId,
      },
    });
    return userData.data;
  } catch (e: any) {
    alert({title: '마이페이지 정보 조회 실패', body: e.message});
    return null;
  }
};

export const requestMyPageWithDrawal = async (userId: string) => {
  try {
    await axios.delete('/user/delete', {id: userId});
    return true;
  } catch (e: any) {
    alert({title: '회원탈퇴 실패', body: e.message});
    return false;
  }
};

export const requestPostUserProfile = async (formData: FormData) => {
  try {
    const result = await axios.post('/user/updateProfilePhoto', formData, {
      headers: {
        'Content-topic': 'multipart/form-data',
      },
    });
    return result;
  } catch (e: any) {
    alert({title: '프로필 변경에 실패하였습니다', body: e.message});
    return null;
  }
};

export const requestPatchPassword = async (
  account: string,
  password: string,
) => {
  try {
    await axios.patch('/auth/changePassword', {
      Account: account,
      changePassword: password,
    });
    return true;
  } catch (e: any) {
    alert({
      title: '비밀번호 변경 실패',
      body: `비밀번호 변경에 실패했습니다.\n${e.message}`,
    });
    return false;
  }
};
