import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

export type LoginUserInfo = {
  UserId: string;
  CompanyName: string;
  Nickname: string;
  ProfilePhoto: string;
  refresh_token: string;
  likeBoards: [];
  likeReplies: [];
  likeReReplies: [];
};

const getToken = async () => {
  try {
    // 기기 등록이 안되어있다면, 기기 토큰을 먼저 등록해야 한다.
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }

    // 토큰 가져오기
    const token = await messaging().getToken();
    return token;

    // 유저 토큰 저장하기
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const requestUserInfo = async (
  ID: string,
  password: string,
): Promise<LoginUserInfo | null> => {
  try {
    const FCMToken = getToken();

    const loginUserInfo = await axios.post('/auth/login', {
      Account: ID,
      Password: password,
      FCMToken,
    });
    return loginUserInfo.data;
  } catch (error: any) {
    return null;
  }
};
