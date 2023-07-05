import React from 'react';
import {useState} from 'react';
import useApi from './useApi';
import axios from 'axios';
import {showToast} from 'utils/toast';
import {useNavigation} from '@react-navigation/native';

function usePlusView() {
  const [viewCnt, setViewCnt] = useState(0);
  const {handleAsyncMethod, isLoading} = useApi();
  const navigation = useNavigation();

  const onErrorPlusLike = error => {
    console.log(error.message);
    return false;
  };

  const handlePlusView = async singleData => {
    const plusView = async () => {
      return await axios.patch('/board/updateBoardViews', {
        BoardId: singleData.BoardId,
      });
    };
    const onSuccessPlusView = result => {
      setViewCnt(viewCnt + 1);
      return true;
    };
    return await handleAsyncMethod(
      plusView,
      onSuccessPlusView,
      onErrorPlusLike,
    );
  };

  return {viewCnt, setViewCnt, handlePlusView};
}

export default usePlusView;
