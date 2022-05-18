import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddBoard, IDeleteBoard } from './types';

export const getBoards = createAsyncThunk('root/getBoards', async (token: string) => {
  const res = await fetch(`${BASE_URL}/boards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // if (res.status === 401) {
  // }

  const data = await res.json();
  return data;
});

export const addNewBoard = createAsyncThunk(
  'root/addNewBoard',
  async ({ title, token }: IAddBoard) => {
    const response = await fetch(`${BASE_URL}/boards`, {
      method: 'POST',
      body: JSON.stringify({ title: title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const deleteBoard = createAsyncThunk(
  'root/deleteBoard',
  async ({ id, token }: IDeleteBoard) => {
    await fetch(`${BASE_URL}/boards/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);
