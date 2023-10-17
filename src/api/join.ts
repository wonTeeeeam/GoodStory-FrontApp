import axios from 'axios';
import {alert} from 'utils/alert';

export const requestEmailExist = async (email: string) => {
  try {
    const result = await axios.post('/user/validateEmail', {
      Account: email,
    });
    if (result.data) {
      alert({title: '이메일 중복', body: '이미 존재하는 이메일입니다.'});
      return false;
    }
    return true;
  } catch (e: any) {
    alert({
      title: '이메일 중복 체크 실패',
      body: `${e.message}`,
    });

    return false;
  }
};

export const requestSendEmail = async (email: string) => {
  try {
    const result = await axios.post('/mail/authEmail', {Account: email});
    if (result.data) {
      alert({title: '이메일 전송 성공', body: '인증번호를 입력해주세요.'});
      return result.data.toString();
    }
    alert({title: '이메일 전송 실패', body: '이메일 전송에 실패했습니다.'});
    return null;
  } catch (e: any) {
    alert({
      title: '이메일 전송 실패',
      body: `이메일 전송에 실패했습니다.\n${e.message}`,
    });
    return null;
  }
};

export const registerUserInfo = async ({
  Email,
  Password,
  name,
}: {
  Email: string;
  Password: string;
  name: string;
}) => {
  try {
    const result = await axios.post('/user/create', {
      Account: Email,
      Password: Password,
      Nickname: name,
      CompanyCode: '123123',
      CompanyName: '중소1',
    });
    return true;
  } catch (e: any) {
    alert({
      title: '회원가입 실패',
      body: `회원가입에 실패했습니다.\n${e.message}`,
    });
    return false;
  }
};

export const checkNickname = async (name: string) => {
  try {
    const result = await axios.post('/user/validateNickname', {
      Nickname: name,
    });
    return result.data ? true : false;
  } catch (e: any) {
    alert({
      title: '닉네임 중복 체크 실패',
      body: `${e.message}`,
    });
    return false;
  }
};
