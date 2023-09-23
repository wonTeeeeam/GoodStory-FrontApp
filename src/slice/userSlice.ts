import {createSlice} from '@reduxjs/toolkit';

// type loginUserInfo = {
//   userId: string;
//   companyName: string;
//   nickname: string;
//   profilePhoto: string;
//   refresh_token: string;
//   likeBoards: string[];
//   likeReplies: string[];
//   likeReReplies: string[];
// };

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
  likeReReplies: [],
  likeReplies: [],
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
    changeProfile: (state, action) => {
      state.profileImage = action.payload;
    },
    handleUserInfo: (state, action) => {
      state.userId = action.payload.UserId;
      // state.account = action.payload.Account;
      state.nickName = action.payload.Nickname;
      state.profileImage = action.payload.ProfilePhoto;
      // state.createdDate = action.payload.Created_date;
      // state.companyCode = action.payload.CompanyCode;
      state.companyName = action.payload.CompanyName;
      state.accessToken = action.payload.access_token;
      state.likeBoards = action.payload.likeBoards;
      state.likeReReplies = action.payload.likeReReplies;
      state.likeReplies = action.payload.likeReplies;
    },
    initUserInfo: () => {
      return initialState;
    },
    handleLikeBoards: (state, action) => {
      state.likeBoards = action.payload;
    },
    handleLikeReply: (state, action) => {
      state.likeReplies = action.payload;
    },
    handleLikeReReplies: (state, action) => {
      state.likeReReplies = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  handleUserInfo,
  initUserInfo,
  changeProfile,
  handleLikeBoards,
  handleLikeReply,
  handleLikeReReplies,
} = userSlice.actions;

export default userSlice.reducer;
