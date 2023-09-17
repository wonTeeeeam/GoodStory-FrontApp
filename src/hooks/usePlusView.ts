import {useState} from 'react';
import {PostListElement} from './useFetchPostList';
import {requestPlusView} from 'api/viewCnt';

function usePlusView() {
  const [viewCnt, setViewCnt] = useState(0);

  const handlePlusView = async (singleData: PostListElement) => {
    const plusViewResult = await requestPlusView(singleData.BoardId);
    if (!plusViewResult) return;
    setViewCnt(viewCnt + 1);
  };

  return {viewCnt, setViewCnt, handlePlusView};
}

export default usePlusView;
