import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskModal: (state, action: PayloadAction<boolean>) => {
      state.isTaskModal = action.payload;
    },
  },
  extraReducers: {},
});

export default taskSlice.reducer;
