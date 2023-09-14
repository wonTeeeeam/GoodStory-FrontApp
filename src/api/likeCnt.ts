import axios from 'axios';

export const requestPlusLike = async (BoardId: string, userId: string) => {
  return await axios.post('/likeboard/presslikeboard', {
    LikeBoardNumber: singleData.BoardId,
    user: {
      UserId: userId,
    },
  });
};
