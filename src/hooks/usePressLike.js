import axios from 'axios';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {showToast} from 'utils/toast';
import useApi from './useApi';

function usePressLike() {
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const {userId} = useSelector(state => state.user);
  const {handleAsyncMethod, isLoading, setIsLoading} = useApi();

  const handlePressLike = async singleData => {
    if (!userId) {
      showToast('로그인이 필요한 서비스입니다.');
    }
    !isLikePressed ? await plusLike(singleData) : await minusLike(singleData);
  };

  const onSuccessPlusLike = result => {
    setLikeCnt(likeCnt + 1);
    setIsLikePressed(true);
  };

  const onErrorPlusLike = error => {
    console.log(error.message);
    showToast('좋아요에 실패하였습니다. 잠시후에 다시 시도해주세요');
  };

  const onSuccessMinusLike = result => {
    setLikeCnt(likeCnt - 1);
    setIsLikePressed(false);
  };

  const onErrorMinusLike = error => {
    console.log(error.message);
    showToast('좋아요 취소에 실패하였습니다. 잠시후에 다시 시도해주세요');
  };

  const plusLike = async singleData => {
    const plusLikeButton = async () => {
      return await axios.post('/likeboard/presslikeboard', {
        LikeBoardNumber: singleData.BoardId,
        user: {
          UserId: userId,
        },
      });
    };
    await handleAsyncMethod(plusLikeButton, onSuccessPlusLike, onErrorPlusLike);
  };

  const minusLike = async singleData => {
    const minusLikeButton = async () => {
      return await axios.post('/likeboard/pressdislikeboard', {
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
}

export default usePressLike;
