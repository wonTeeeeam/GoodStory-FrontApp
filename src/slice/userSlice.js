import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isUserStartJoin: false,
    userId: '',
    accessToken: '',
  },
  reducers: {
    handleIsUserStartJoin: state => {
      state.isUserStartJoin = !state.isUserStartJoin;
    },
    handleUserId: (state, action) => {
      state.userId = action.payload;
    },
    handleAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleIsUserStartJoin, handleAccessToken} = userSlice.actions;

export default userSlice.reducer;
