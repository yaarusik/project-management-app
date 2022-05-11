import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isCreateNewBoard: false,
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setIsCreateNewBoard: (state, action) => {
      state.isCreateNewBoard = action.payload;
    },
  },
});

export const { setIsCreateNewBoard } = rootSlice.actions;

export default rootSlice.reducer;
