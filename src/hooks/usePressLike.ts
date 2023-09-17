import {useState} from 'react';

import {showToast} from 'utils/toast';
import {useAppSelector} from 'store/hooks';
import {RootState} from 'store/store';
import {requestMinusLike, requestPlusLike} from 'api/likeCnt';
import {PostListElement} from './useFetchPostList';

const usePressLike = () => {
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const {userId} = useAppSelector((state: RootState) => state.user);

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
    setLikeCnt(likeCnt + 1);
    setIsLikePressed(true);
  };

  const minusLike = async (singleData: PostListElement) => {
    const minusLikeResult = await requestMinusLike(singleData.BoardId, userId);
    if (!minusLikeResult) {
      return;
    }
    setLikeCnt(likeCnt - 1);
    setIsLikePressed(false);
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
