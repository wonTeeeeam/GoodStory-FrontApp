import {createSlice} from '@reduxjs/toolkit';
import {PostListElement} from 'hooks/useFetchPostList';

export type BoardCountDetail = {
  BoardId: string;
  likeCnt: number;
  replyCnt: number;
  viewCnt: number;
};

const initialState: BoardCountDetail[] = [];

export const BoardCountDetailSlice = createSlice({
  name: 'board',
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
  BoardCountDetailSlice.actions;

export default BoardCountDetailSlice.reducer;
