import { createSlice } from '@reduxjs/toolkit';
import { getColumns, addNewColumn } from '../../utils/api/columns';
import initialState from '../initialState';

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setIsModalNewColumn: (state, action) => {
      state.isModalNewColumn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
    builder.addCase(addNewColumn.fulfilled, (state, action) => {
      state.columns = [...state.columns, action.payload];
    });
  },
});

export const { setIsModalNewColumn } = columnSlice.actions;

export default columnSlice.reducer;
