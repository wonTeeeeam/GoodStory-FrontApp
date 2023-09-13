import axios from 'axios';

export const requestUserInfo = async (ID: string, password: string) => {
  try {
    const loginUserInfo = await axios.post('/auth/login', {
      Account: ID,
      Password: password,
    });
    return loginUserInfo;
  } catch (error: any) {
    return null;
  }
};
