import {createSlice} from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
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
export const {handleIsUserStartJoin} = navigationSlice.actions;

export default navigationSlice.reducer;
