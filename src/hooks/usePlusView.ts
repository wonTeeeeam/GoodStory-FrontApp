import {useAppSelector} from 'store/hooks';
import {PostListElement} from './useFetchPostList';
import {requestPlusView} from 'api/viewCnt';
import {RootState} from 'store/store';
import {useDispatch} from 'react-redux';
import {changeBoardCountExisted} from 'slice/boardCountDetailSlice';
import {showToast} from 'utils/toast';

const usePlusView = () => {
  const boardCountDetail = useAppSelector(
    (state: RootState) => state.boardCountDetail,
  );
  const dispatch = useDispatch();

  const handlePlusView = async (singleData: PostListElement) => {
    const targetBoardCount = boardCountDetail.find(
      boardCount => boardCount.BoardId === singleData.BoardId,
    );
    if (!targetBoardCount) {
      return showToast(`조회수 올리는데 실패하였습니다!`);
    }
    const plusViewResult = await requestPlusView(singleData.BoardId);
    if (!plusViewResult) return;
    dispatch(
      changeBoardCountExisted({
        BoardId: targetBoardCount.BoardId,
        likeCnt: targetBoardCount.likeCnt,
        replyCnt: targetBoardCount.replyCnt,
        viewCnt: targetBoardCount.viewCnt + 1,
      }),
    );
  };

  return {handlePlusView};
};

export default usePlusView;
