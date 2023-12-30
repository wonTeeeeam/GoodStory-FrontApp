import {configureStore} from '@reduxjs/toolkit';
import boardCountDetailReducer from 'slice/boardCountDetailSlice';
import myActivityCountDetailReducer from 'slice/myActivityCountDetailSlice';
import navigationReducer from 'slice/navigationSlice';
import userReducer from 'slice/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    navigation: navigationReducer,
    boardCountDetail: boardCountDetailReducer,
    myActivityCountDetail: myActivityCountDetailReducer,
  },
});

export function setupStore(preloadedState: {}) {
  return configureStore({
    reducer: {
      user: userReducer,
      navigation: navigationReducer,
      boardCountDetail: boardCountDetailReducer,
      myActivityCountDetail: myActivityCountDetailReducer,
    },
    preloadedState,
  });
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
