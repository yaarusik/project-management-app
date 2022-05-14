import { createSlice } from '@reduxjs/toolkit';
import { addNewBoard, getBoards } from '../../Components/Api';
import initialState from '../initialState';

export const boardSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setIsCreateNewBoard: (state, action) => {
      state.isCreateNewBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(addNewBoard.fulfilled, (state, action) => {
      state.title = action.payload;
    });
  },
});

export const { setIsCreateNewBoard } = boardSlice.actions;

export default boardSlice.reducer;
