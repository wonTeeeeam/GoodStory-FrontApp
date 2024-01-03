import {useAppSelector} from 'store/hooks';
import {PostListElement} from './useFetchPostList';
import {requestPlusView} from 'api/viewCnt';
import {RootState} from 'store/store';
import {useDispatch} from 'react-redux';
import {changeBoardCountExisted} from 'slice/boardCountDetailSlice';
import {showToast} from 'utils/toast';
import {changeMyPageBoardCountExisted} from 'slice/myActivityCountDetailSlice';

const usePlusView = () => {
  const boardCountDetail = useAppSelector(
    (state: RootState) => state.boardCountDetail,
  );
  const myPageCountDetail = useAppSelector(
    (state: RootState) => state.myActivityCountDetail,
  );
  const dispatch = useDispatch();

  const handlePlusView = async (singleData: PostListElement) => {
    const targetBoardCount = boardCountDetail.find(
      boardCount => boardCount.BoardId === singleData.BoardId,
    );

    const myPageTargetBoardCount = myPageCountDetail.find(
      boardCount => boardCount.BoardId === singleData.BoardId,
    );
    if (!targetBoardCount && !myPageTargetBoardCount) {
      return showToast(`조회수 올리는데 실패하였습니다!`);
    }
    if (targetBoardCount) {
      dispatch(
        changeBoardCountExisted({
          BoardId: targetBoardCount.BoardId,
          likeCnt: targetBoardCount.likeCnt,
          replyCnt: targetBoardCount.replyCnt,
          viewCnt: targetBoardCount.viewCnt + 1,
        }),
      );
    }
    if (myPageTargetBoardCount) {
      dispatch(
        changeMyPageBoardCountExisted({
          BoardId: myPageTargetBoardCount.BoardId,
          likeCnt: myPageTargetBoardCount.likeCnt,
          replyCnt: myPageTargetBoardCount.replyCnt,
          viewCnt: myPageTargetBoardCount.viewCnt + 1,
        }),
      );
    }
    const plusViewResult = await requestPlusView(singleData.BoardId);
    if (!plusViewResult) return;
  };

  return {handlePlusView};
};

export default usePlusView;
