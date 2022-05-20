import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from '../initialState';

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default taskSlice.reducer;
