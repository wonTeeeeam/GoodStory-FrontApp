import {useState} from 'react';

const useReply = () => {
  const [replyCnt, setReplyCnt] = useState(0);
  const handleSetReplyCnt = (newValue: number) => {
    setReplyCnt(newValue);
  };
  return {replyCnt, handleSetReplyCnt};
};

export default useReply;
