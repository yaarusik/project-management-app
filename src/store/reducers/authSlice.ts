import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authorization, registration } from '../../utils/api/auth';
import initialState from './../initialState';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setSnackBar(state, action: PayloadAction<boolean>) {
      state.isSnackbar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      console.log('registration pending');
      state.isPendingRegistration = true;
    });
    builder.addCase(registration.fulfilled, (state) => {
      console.log('registration fulfilled');
      state.isPendingRegistration = false;
    });
    builder.addCase(registration.rejected, (state) => {
      console.log('registration rejected');
      state.isPendingRegistration = false;
    });
    builder.addCase(authorization.pending, (state) => {
      console.log('authorization pending');
      state.isPendingAuth = true;
    });
    builder.addCase(authorization.fulfilled, (state) => {
      console.log('authorization fullfilled');
      state.isAuth = true;
      state.isPendingAuth = false;
    });
    builder.addCase(authorization.rejected, (state) => {
      console.log('authorization rejected');
      state.isPendingAuth = false;
    });
  },
});

export default authSlice.reducer;
