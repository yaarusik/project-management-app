import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from '../initialState';
import { createTask } from './../../utils/api/tasks';

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(createTask.pending, (state) => { });
  },
});

export default taskSlice.reducer;
