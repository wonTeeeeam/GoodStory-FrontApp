import axios from 'axios';
import {showToast} from 'utils/toast';

export const requestPlusLike = async (BoardId: string, userId: string) => {
  try {
    await axios.post('/likeboard/presslikeboard', {
      LikeBoardNumber: BoardId,
      user: {
        UserId: userId,
      },
    });
    return true;
  } catch (e: any) {
    showToast(`좋아요에 실패하였습니다.\n${e.message}`);
    return false;
  }
};

export const requestMinusLike = async (BoardId: string, userId: string) => {
  try {
    await axios.delete('/likeboard/pressdislikeboard', {
      params: {
        LikeBoardNumber: BoardId,
        UserId: userId,
      },
    });
    return true;
  } catch (e: any) {
    showToast(`좋아요 취소에 실패하였습니다.\n${e.message}`);
    return false;
  }
};
