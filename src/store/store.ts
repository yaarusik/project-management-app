import { configureStore, combineReducers } from '@reduxjs/toolkit';
import boardSlice from './reducers/boardSlice';
import authSlice from './reducers/authSlice';

const rootReducer = combineReducers({
  boardSlice,
  authSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
