import { createSlice } from '@reduxjs/toolkit';
import initialState from '../initialState';

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
