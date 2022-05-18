import { createSlice } from '@reduxjs/toolkit';
import { addNewBoard, getBoards } from '../../utils/api/boards';
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
    setSelectedBoardId: (state, action) => {
      state.selectedBoardId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(addNewBoard.fulfilled, (state, action) => {
      state.boards = [...state.boards, action.payload];
    });
  },
});

export const { setIsModalNewBoard, setSelectedBoardTitle, setSelectedBoardId } = boardSlice.actions;

export default boardSlice.reducer;
