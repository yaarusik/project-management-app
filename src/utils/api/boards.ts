import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const userToken = Cookies.get('user');

export const getBoards = createAsyncThunk('root/getBoards', async () => {
  const res = await fetch(`${BASE_URL}/boards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });

  // if (res.status === 401) {
  // }

  const data = await res.json();
  return data;
});

export const addNewBoard = createAsyncThunk('root/addNewBoard', async (titleName: string) => {
  const response = await fetch(`${BASE_URL}/boards`, {
    method: 'POST',
    body: JSON.stringify({ title: titleName }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });
  const data = await response.json();
  return data;
});

export const deleteBoard = createAsyncThunk('root/deleteBoard', async (id: string) => {
  await fetch(`${BASE_URL}/boards/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
});
