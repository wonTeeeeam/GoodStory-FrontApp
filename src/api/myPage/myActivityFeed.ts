import axios from 'axios';
import {alert} from 'utils/alert';

export const requestMyLikeBoards = async (
  userId: string,
  top: number,
  skip: number,
) => {
  try {
    const likeBoardList = await axios.get('/user/myPage/getAllLikes', {
      params: {
        UserId: userId,
        top,
        skip,
      },
    });
    return likeBoardList.data;
  } catch (e: any) {
    alert({title: '좋아요 누른 게시글 조회 실패', body: e.message});
    return null;
  }
};

export const requestMyReplies = async (
  userId: string,
  top: number,
  skip: number,
) => {
  try {
    const replyList = await axios.get('/user/myPage/getAllReplies', {
      params: {
        UserId: userId,
        top,
        skip,
      },
    });

    return replyList.data;
  } catch (e: any) {
    console.log(e.message);
    alert({title: '작성한 댓글 조회 실패', body: e.message});
    return null;
  }
};

export const requestMyBoards = async (
  userId: string,
  top: number,
  skip: number,
) => {
  try {
    const myBoardList = await axios.get('/user/myPage/getAllBoards', {
      params: {
        UserId: userId,
        top,
        skip,
      },
    });
    return myBoardList.data;
  } catch (e: any) {
    alert({title: '작성한 게시글 조회 실패', body: e.message});
    return null;
  }
};
