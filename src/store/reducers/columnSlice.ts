import { createSlice } from '@reduxjs/toolkit';
import { getColumns, addNewColumn, updateColumn } from '../../utils/api/columns';
import initialState from '../initialState';

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setIsModalNewColumn: (state, action) => {
      state.isModalNewColumn = action.payload;
    },
    setCurrentColumnId: (state, action) => {
      state.currentColumnId = action.payload;
    },
    setCurrentColumnOrder: (state, action) => {
      state.currentColumnOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.columns = action.payload;
    });
    builder.addCase(addNewColumn.fulfilled, (state, action) => {
      state.columns = [...state.columns, action.payload];
    });
    builder.addCase(updateColumn.fulfilled, (state, action) => {
      state.updateColumn = action.payload;
    });
  },
});

export const { setIsModalNewColumn, setCurrentColumnId, setCurrentColumnOrder } =
  columnSlice.actions;

export default columnSlice.reducer;
