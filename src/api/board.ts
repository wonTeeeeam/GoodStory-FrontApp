import axios from 'axios';
import {alert} from 'utils/alert';

export type User = {
  UserId: string;
};

export const requestNewPosting = async (formData: FormData) => {
  try {
    await axios.post('/board/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return true;
  } catch (e: any) {
    alert({
      title: '게시글 등록 실패',
      body: `게시글 등록에 실패했습니다.\n${e.message}`,
    });
  }
  return false;
};

export const request_deleteBoard = async (user: User, BoardId: string) => {
  try {
    const response = await axios.delete('/board/delete', {
      data: {user, BoardId},
    });
    return true;
  } catch (e: any) {
    console.log(e);
    alert({
      title: '게시글 삭제 실패',
      body: `게시글 삭제에 실패했습니다.\n${e.message}`,
    });
  }
};

type BoardInfo = {
  BoardId: string;
  Title: string;
  Category: string;
  Content: string;
};

export const request_editBoard = async (boardInfo: BoardInfo) => {
  try {
    const response = await axios.patch('/board/update', {
      ...boardInfo,
    });
    alert({
      title: '게시글 수정 성공',
      body: '게시글 수정에 성공했습니다.',
    });
    return true;
  } catch (e: any) {
    alert({
      title: '게시글 수정 실패',
      body: `게시글 수정에 실패했습니다.\n${e.message}\n잠시후에 다시 시도해주세요.`,
    });
    return false;
  }
};
