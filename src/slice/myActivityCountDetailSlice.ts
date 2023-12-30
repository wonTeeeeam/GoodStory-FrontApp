import {createSlice} from '@reduxjs/toolkit';
import {PostListElement} from 'hooks/useFetchPostList';

import {BoardCountDetail} from './boardCountDetailSlice';

const initialState: BoardCountDetail[] = [];

export const myActivityCountDetailSlice = createSlice({
  name: 'myActivity',
  initialState,
  reducers: {
    addBoardCount: (state, action) => {
      return action.payload.map((board: PostListElement) => {
        return {
          BoardId: board.BoardId,
          likeCnt: board.Like,
          replyCnt: board.ReplyCount,
          viewCnt: board.Views,
        };
      });
    },

    changeBoardCountExisted: (state, action) => {
      return [
        ...state.filter(
          boardDetail => boardDetail.BoardId !== action.payload.BoardId,
        ),
        {
          BoardId: action.payload.BoardId,
          likeCnt: action.payload.likeCnt,
          replyCnt: action.payload.replyCnt,
          viewCnt: action.payload.viewCnt,
        },
      ];
    },

    initBoardCountDetail: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addBoardCount, changeBoardCountExisted, initBoardCountDetail} =
  myActivityCountDetailSlice.actions;

export default myActivityCountDetailSlice.reducer;
