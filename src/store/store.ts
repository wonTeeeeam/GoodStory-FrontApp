import {configureStore} from '@reduxjs/toolkit';
import userReducer from 'slice/userSlice';
import navigationReducer from 'slice/navigationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
  },
});

export function setupStore(preloadedState: {}) {
  return configureStore({
    reducer: {
      user: userReducer,
      navigation: navigationReducer,
    },
    preloadedState,
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
