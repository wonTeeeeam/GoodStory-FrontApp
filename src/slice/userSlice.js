import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isUserStartJoin: false,
  },
  reducers: {
    handleIsUserStartJoin: state => {
      state.isUserStartJoin = !state.isUserStartJoin;
    },
  },
});

// Action creators are generated for each case reducer function
export const {handleIsUserStartJoin} = userSlice.actions;

export default userSlice.reducer;
