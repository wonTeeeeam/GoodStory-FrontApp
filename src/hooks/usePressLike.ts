import {useState} from 'react';
import axios from 'axios';

import {showToast} from 'utils/toast';
import useApi from './useApi';
import {useAppSelector} from 'store/hooks';
import {ListData} from 'components/PostList';
import {RootState} from 'store/store';
import {requestPlusLike} from 'api/viewLikeReplyCnt';

const usePressLike = () => {
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const {userId} = useAppSelector((state: RootState) => state.user);
  const {handleAsyncMethod} = useApi();

  const handlePressLike = async (singleData: ListData) => {
    if (!userId) {
      showToast('로그인이 필요한 서비스입니다.');
    }
    !isLikePressed ? await plusLike(singleData) : await minusLike(singleData);
  };

  const onSuccessPlusLike = () => {};

  const onErrorPlusLike = (error: any) => {
    console.log(error.message);
  };

  const onSuccessMinusLike = () => {
    setLikeCnt(likeCnt - 1);
    setIsLikePressed(false);
  };

  const onErrorMinusLike = (error: any) => {
    console.log(error.message);
    showToast('좋아요 취소에 실패하였습니다. 잠시후에 다시 시도해주세요');
  };

  const plusLike = async (singleData: ListData) => {
    const plusLikeResult = await requestPlusLike(singleData.BoardId, userId);
    if (!plusLikeResult) {
      return showToast('좋아요에 실패하였습니다. 잠시후에 다시 시도해주세요');
    }
    setLikeCnt(likeCnt + 1);
    setIsLikePressed(true);
  };

  const minusLike = async (singleData: ListData) => {
    const minusLikeButton = async () => {
      return await axios.delete('/likeboard/pressdislikeboard', {
        params: {
          LikeBoardNumber: singleData.BoardId,
          UserId: userId,
        },
      });
    };
    await handleAsyncMethod(
      minusLikeButton,
      onSuccessMinusLike,
      onErrorMinusLike,
    );
  };

  return {
    handlePressLike,
    likeCnt,
    setLikeCnt,
    isLikePressed,
    setIsLikePressed,
  };
};

export default usePressLike;
