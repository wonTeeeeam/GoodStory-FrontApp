import {useState} from 'react';
import {requestPlusView} from 'api/viewLikeReplyCnt';

function usePlusView() {
  const [viewCnt, setViewCnt] = useState(0);

  const handlePlusView = async singleData => {
    const plusViewResult = await requestPlusView(singleData.BoardId);
    if (!plusViewResult) return;
    setViewCnt(viewCnt + 1);
  };

  return {viewCnt, setViewCnt, handlePlusView};
}

export default usePlusView;
