import React from 'react';
import {render} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import userReducer from 'slice/userSlice';
import navigationReducer from 'slice/navigationSlice';
import {setupStore} from 'store/store';

// As a basic setup, import your same slice reducers

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
