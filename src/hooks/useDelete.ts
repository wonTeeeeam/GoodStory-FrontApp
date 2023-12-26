import {request_deleteBoard} from 'api/board';
import React from 'react';

const useDelete = () => {
  const deleteBoard = async () => {
    await request_deleteBoard();
  };

  const deleteReply = async () => {
    await request_deleteBoard();
  };

  return {deleteBoard};
};

export default useDelete;
