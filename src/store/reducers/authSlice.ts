import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authorization, registration } from '../../utils/api/api';
import initialState from './../initialState';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registration.pending, () => {
      console.log('registration pending');
    });
    builder.addCase(registration.fulfilled, () => {
      console.log('registration fulfilled');
    });
    builder.addCase(registration.rejected, (state) => {
      state.status = 'rejected';
      console.log('registration rejected');
    });
    builder.addCase(authorization.pending, () => {
      console.log('authorization pending');
    });
    builder.addCase(authorization.fulfilled, (state) => {
      console.log('authorization fullfilled');
      state.isAuth = true;
    });
  },
});

export default authSlice.reducer;
