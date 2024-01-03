import {useState} from 'react';

import {showToast} from 'utils/toast';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';
import {requestMinusLike, requestPlusLike} from 'api/likeCnt';
import {PostListElement} from './useFetchPostList';
import {handleLikeBoards} from 'slice/userSlice';
import {useDispatch} from 'react-redux';
import {changeBoardCountExisted} from 'slice/boardCountDetailSlice';
import {changeMyPageBoardCountExisted} from 'slice/myActivityCountDetailSlice';

const usePressLike = () => {
  const [isLikePressed, setIsLikePressed] = useState(false);
  const {userId, likeBoards} = useAppSelector((state: RootState) => state.user);
  const boardCountDetail = useAppSelector(
    (state: RootState) => state.boardCountDetail,
  );

  const myPageCountDetail = useAppSelector(
    (state: RootState) => state.myActivityCountDetail,
  );

  const dispatch = useDispatch();

  const handlePressLike = async (singleData: PostListElement) => {
    if (!userId) {
      showToast('로그인이 필요한 서비스입니다.');
    }
    !isLikePressed ? await plusLike(singleData) : await minusLike(singleData);
  };

  const plusLike = async (singleData: PostListElement) => {
    const plusLikeResult = await requestPlusLike(singleData.BoardId, userId);
    if (!plusLikeResult) {
      return;
    }
    const targetBoardCount = boardCountDetail.find(
      boardCount => boardCount.BoardId === singleData.BoardId,
    );

    const myPageTargetBoardCount = myPageCountDetail.find(
      boardCount => boardCount.BoardId === singleData.BoardId,
    );

    if (!targetBoardCount && !myPageTargetBoardCount) {
      return showToast(`좋아요을 업데이트하는데 실패하였습니다!`);
    }
    dispatch(handleLikeBoards([...likeBoards, `${singleData.BoardId}`]));

    if (targetBoardCount) {
      dispatch(
        changeBoardCountExisted({
          BoardId: targetBoardCount.BoardId,
          likeCnt: targetBoardCount.likeCnt + 1,
          replyCnt: targetBoardCount.replyCnt,
          viewCnt: targetBoardCount.viewCnt,
        }),
      );
    }

    if (myPageTargetBoardCount) {
      dispatch(
        changeMyPageBoardCountExisted({
          BoardId: myPageTargetBoardCount.BoardId,
          likeCnt: myPageTargetBoardCount.likeCnt + 1,
          replyCnt: myPageTargetBoardCount.replyCnt,
          viewCnt: myPageTargetBoardCount.viewCnt,
        }),
      );
    }

    // setLikeCnt(likeCnt + 1);
    setIsLikePressed(true);
  };

  const minusLike = async (singleData: PostListElement) => {
    const minusLikeResult = await requestMinusLike(singleData.BoardId, userId);
    if (!minusLikeResult) {
      return;
    }
    const newLikeBoardList = likeBoards.filter(
      likeBoard => likeBoard !== singleData.BoardId,
    );
    const targetBoardCount = boardCountDetail.find(
      boardCount => boardCount.BoardId === singleData.BoardId,
    );
    if (!targetBoardCount) {
      return showToast(`좋아요을 업데이트하는데 실패하였습니다!`);
    }
    dispatch(handleLikeBoards([...newLikeBoardList]));
    dispatch(
      changeBoardCountExisted({
        BoardId: targetBoardCount.BoardId,
        likeCnt: targetBoardCount.likeCnt - 1,
        replyCnt: targetBoardCount.replyCnt,
        viewCnt: targetBoardCount.viewCnt,
      }),
    );

    // setLikeCnt(likeCnt - 1);
    setIsLikePressed(false);
  };

  return {
    handlePressLike,
    isLikePressed,
    setIsLikePressed,
  };
};

export default usePressLike;
