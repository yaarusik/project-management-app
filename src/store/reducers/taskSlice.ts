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
  },
});

export default taskSlice.reducer;
