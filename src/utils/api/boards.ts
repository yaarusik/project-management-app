import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddBoard, IDeleteBoard, IGetBoardById } from './types';

export const getBoards = createAsyncThunk('root/getBoards', async (token: string) => {
  const res = await fetch(`${BASE_URL}/boards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
});

export const addNewBoard = createAsyncThunk(
  'root/addNewBoard',
  async ({ title, description, token }: IAddBoard) => {
    const response = await fetch(`${BASE_URL}/boards`, {
      method: 'POST',
      body: JSON.stringify({ title, description }),

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

export const getBoardById = createAsyncThunk(
  'root/getBoardById',
  async ({ selectedBoardId, token }: IGetBoardById) => {
    const res = await fetch(`${BASE_URL}/boards/${selectedBoardId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  }
);
