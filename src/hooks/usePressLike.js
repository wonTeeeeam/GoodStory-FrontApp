import axios from 'axios';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {showToast} from 'utils/toast';

function usePressLike() {
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const {userId} = useSelector(state => state.user);

  const handlePressLike = async singleData => {
    if (!userId) {
      showToast('로그인이 필요한 서비스입니다.');
    }
    !isLikePressed ? await plusLike(singleData) : await minusLike(singleData);
  };

  const plusLike = async singleData => {
    try {
      const result = await axios.post('/likeboard/presslikeboard', {
        LikeBoardNumber: singleData.BoardId,
        user: {
          UserId: userId,
        },
      });
      setLikeCnt(likeCnt + 1);
      setIsLikePressed(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const minusLike = async singleData => {
    try {
      const result = await axios.delete('/likeboard/pressdislikeboard', {
        params: {
          LikeBoardNumber: singleData.BoardId,
          UserId: userId,
        },
      });
      setLikeCnt(likeCnt - 1);
      setIsLikePressed(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  return {handlePressLike, likeCnt, setLikeCnt};
}

export default usePressLike;
