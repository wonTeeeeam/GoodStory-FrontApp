import axios from 'axios';

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

export const requestUserInfo = async (
  ID: string,
  password: string,
): Promise<LoginUserInfo | null> => {
  try {
    const loginUserInfo = await axios.post('/auth/login', {
      Account: ID,
      Password: password,
    });
    return loginUserInfo.data;
  } catch (error: any) {
    return null;
  }
};
