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
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (state) => {
      state.isPendingRegistration = true;
    });
    builder.addCase(registration.fulfilled, (state) => {
      state.isLoginExist = true;
      state.isPendingRegistration = false;
    });
    builder.addCase(registration.rejected, (state) => {
      state.isPendingRegistration = false;
      state.isLoginExist = false;
    });
    builder.addCase(authorization.pending, (state) => {
      state.isCorrectData = true;
    });
    builder.addCase(authorization.fulfilled, (state) => {
      state.isAuth = true;
    });
    builder.addCase(authorization.rejected, (state) => {
      state.isCorrectData = false;
    });
  },
});

export default authSlice.reducer;
