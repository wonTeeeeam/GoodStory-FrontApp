import axios from 'axios';

export const requestPlusView = async (BoardId: string) => {
  try {
    await axios.patch('/board/updateBoardViews', {
      BoardId,
    });
    return true;
  } catch (e: any) {
    return false;
  }
};
