import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  account: '',
  nickName: '',
  profileImage: '',
  createdDate: '',
  companyCode: '',
  companyName: '',
  accessToken: '',
  likeBoards: [],
  likeReReplys: [],
  likeReplys: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleUserId: (state, action) => {
      state.userId = action.payload;
    },
    handleAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    handleUserInfo: (state, action) => {
      state.userId = action.payload.UserId;
      state.account = action.payload.Account;
      state.nickName = action.payload.Nickname;
      state.profileImage = action.payload.ProfilePhoto;
      state.createdDate = action.payload.Created_date;
      state.companyCode = action.payload.CompanyCode;
      state.companyName = action.payload.CompanyName;
      state.accessToken = action.payload.access_token;
      state.likeBoards = action.payload.likeBoards;
      state.likeReReplys = action.payload.likeReReplys;
      state.likeReplys = action.payload.likeReplys;
    },
    initUserInfo: (state, action) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleUserInfo, initUserInfo} = userSlice.actions;

export default userSlice.reducer;
