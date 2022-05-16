import { createSlice } from '@reduxjs/toolkit';
import { addNewBoard, getBoards } from '../../Components/Api/boards';
import initialState from '../initialState';

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setIsCreateNewBoard: (state, action) => {
      state.isCreateNewBoard = action.payload;
    },
    setIsDeleteBoard: (state, action) => {
      state.isDeleteBoard = action.payload;
    },
    setSelectedBoardTitle: (state, action) => {
      state.selectedBoardTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(addNewBoard.fulfilled, (state, action) => {
      state.currentBoardTitle = action.payload;
    });
  },
});

export const { setIsCreateNewBoard, setIsDeleteBoard, setSelectedBoardTitle } = boardSlice.actions;

export default boardSlice.reducer;
