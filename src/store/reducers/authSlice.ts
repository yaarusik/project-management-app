import { createSlice } from '@reduxjs/toolkit';
import { authorization, registration } from '../../utils/api/api';
import initialState from './../initialState';

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.pending, () => {
      console.log('registration pending');
    });
    builder.addCase(authorization.pending, () => {
      console.log('authorization pending');
    });
  },
});

export default authSlice.reducer;
