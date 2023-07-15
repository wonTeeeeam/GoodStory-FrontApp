import {configureStore} from '@reduxjs/toolkit';
import userReducer from 'slice/userSlice';
import navigationReducer from 'slice/navigationSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
  },
});

export function setupStore(preloadedState) {
  return configureStore({
    reducer: {
      user: userReducer,
      navigation: navigationReducer,
    },
    preloadedState,
  });
}
