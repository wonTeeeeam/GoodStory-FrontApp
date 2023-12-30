import {request_deleteBoard} from 'api/board';
import {request_deleteReply} from 'api/reply';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';

const useDeleteOrEdit = () => {
  const {userId} = useAppSelector((state: RootState) => state.user);

  const deleteBoard = async (BoardId: string) => {
    await request_deleteBoard({UserId: userId}, BoardId);
  };

  // const editBoard = async (BoardId: string) => {};

  const deleteReply = async (BoardId: string, ReplyId: string) => {
    await request_deleteReply(BoardId, ReplyId);
  };

  return {deleteBoard, deleteReply};
};

export default useDeleteOrEdit;
