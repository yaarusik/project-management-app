import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasks, createTask } from './../../utils/api/tasks';
import { TaskInitialState as initialState } from '../initialStates/taskInitialState';
import { ITaskInitialState, ITask } from '../initialStates/types';

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(
      createTask.fulfilled,
      (state: ITaskInitialState, action: PayloadAction<ITask>) => {
        state.tasks = [...state.tasks, action.payload];
      }
    );
  },
});

export default taskSlice.reducer;
