import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IAddColumn, IUpdateColumn } from './types';

const userToken = Cookies.get('user');

export const getColumns = createAsyncThunk('columns/getColumns', async (boardId: string) => {
  const res = await fetch(`${BASE_URL}/boards/${boardId}/columns`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });

  const data = await res.json();
  return data;
});

export const addNewColumn = createAsyncThunk(
  'columns/addNewColumn',
  async ({ boardId, title }: IAddColumn) => {
    console.log(title, boardId);
    const response = await fetch(`${BASE_URL}/boards/${boardId}/columns`, {
      method: 'POST',
      body: JSON.stringify({ title: title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({ columnData, boardId, columnId }: IUpdateColumn) => {
    const response = await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
      method: 'PUT',
      body: JSON.stringify(columnData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    return data;
  }
);
