import { createSlice } from '@reduxjs/toolkit';

import { TaskInitialState as initialState } from './../initialStates/taskInitialState';

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
});

export default taskSlice.reducer;
