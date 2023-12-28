import {User, request_deleteBoard} from 'api/board';
import {request_deleteReply} from 'api/reply';

const useDelete = () => {
  const deleteBoard = async (user: User, BoardId: string) => {
    await request_deleteBoard(user, BoardId);
  };

  const deleteReply = async (BoardId: string, ReplyId: string) => {
    await request_deleteReply(BoardId, ReplyId);
  };

  return {deleteBoard, deleteReply};
};

export default useDelete;
