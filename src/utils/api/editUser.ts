import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { IEditUserApi } from './types';

export const updateUserProfile = createAsyncThunk(
  'editProfile/updateProfile',
  async ({ userID, token, userData }: IEditUserApi) => {
    const response = await fetch(`${BASE_URL}/users/${userID}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const updateProfile = async ({ userID, token, userData }: IEditUserApi) => {
  const response = await fetch(`${BASE_URL}/users/${userID}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
