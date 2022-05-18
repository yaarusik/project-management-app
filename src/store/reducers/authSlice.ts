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
      state.isPendingRegistration = true;
    });
    builder.addCase(registration.fulfilled, (state) => {
      state.isPendingRegistration = false;
    });
    builder.addCase(registration.rejected, (state) => {
      state.isPendingRegistration = false;
    });
    builder.addCase(authorization.pending, (state) => {
      state.isPendingAuth = true;
    });
    builder.addCase(authorization.fulfilled, (state) => {
      state.isAuth = true;
      state.isPendingAuth = false;
    });
    builder.addCase(authorization.rejected, (state) => {
      state.isPendingAuth = false;
    });
  },
});

export default authSlice.reducer;
