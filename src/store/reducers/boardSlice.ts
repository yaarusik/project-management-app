import { createSlice } from '@reduxjs/toolkit';
import { getBoards } from '../../utils/api/boards';
import initialState from '../initialState';

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setIsModalNewBoard: (state, action) => {
      state.isModalNewBoard = action.payload;
    },
    setSelectedBoardTitle: (state, action) => {
      state.selectedBoardTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
  },
});

export const { setIsModalNewBoard, setSelectedBoardTitle } = boardSlice.actions;

export default boardSlice.reducer;
