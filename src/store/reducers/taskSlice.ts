import { createSlice } from '@reduxjs/toolkit';

import { TaskInitialState as initialState } from './../initialStates/taskInitialState';

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskDecription: (state, action) => {
      state.taskDescription = action.payload;
    },
    setIsBar: (state, action) => {
      state.isBar = action.payload;
    },
    setIsEditTitle: (state, action) => {
      state.isEditTitle = action.payload;
    },
    setIsEditDescription: (state, action) => {
      state.isEditDescription = action.payload;
    },
  },
});

export default taskSlice.reducer;
