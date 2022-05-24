import { configureStore, combineReducers } from '@reduxjs/toolkit';
import boardSlice from './reducers/boardSlice';
import authSlice from './reducers/authSlice';
import columnSlice from './reducers/columnSlice';
import taskSlice from './reducers/taskSlice';
import testSlice from './reducers/testSlice';

const rootReducer = combineReducers({
  boardSlice,
  columnSlice,
  authSlice,
  taskSlice,
  testSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatch = AppStore['dispatch'];
