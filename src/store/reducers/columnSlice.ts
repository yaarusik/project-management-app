import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setIsCreateNewColumn: (state, action) => {
      state.isCreateNewColumn = action.payload;
    },
  },
});

export const { setIsCreateNewColumn } = columnSlice.actions;

export default columnSlice.reducer;
