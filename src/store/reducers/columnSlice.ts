import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setIsModalNewColumn: (state, action) => {
      state.isModalNewColumn = action.payload;
    },
  },
});

export const { setIsModalNewColumn } = columnSlice.actions;

export default columnSlice.reducer;
