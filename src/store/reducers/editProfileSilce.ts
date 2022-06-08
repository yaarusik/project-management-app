import { createSlice } from '@reduxjs/toolkit';
import { updateUserProfile } from '../../utils/api/editUser';
import initialState from '../initialState';

export const editProfileSlice = createSlice({
  name: 'updateUserData',
  initialState,
  reducers: {
    setUpdatedData: (state, action) => {
      state.userUpdateData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUserProfile.pending, (state) => {
      state.isPendingRegistration = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state) => {
      state.isPendingRegistration = false;
    });
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.isPendingRegistration = false;
    });
  },
});

export const { setUpdatedData } = editProfileSlice.actions;

export default editProfileSlice.reducer;
