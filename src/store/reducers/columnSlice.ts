import { createSlice } from '@reduxjs/toolkit';
import { addNewColumn, getColumns } from '../../Components/Api/columns';
import initialState from '../initialState';

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setIsCreateNewColumn: (state, action) => {
      state.isCreateNewColumn = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(getBoards.fulfilled, (state, action) => {
  //       state.boards = action.payload;
  //     });
  //     builder.addCase(addNewBoard.fulfilled, (state, action) => {
  //       state.title = action.payload;
  //     });
  //   },
});

export const { setIsCreateNewColumn } = columnSlice.actions;

export default columnSlice.reducer;
