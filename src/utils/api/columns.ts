import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddColumn, IDeleteColumn, IGetColumns, IUpdateColumn } from './types';

export const getColumns = createAsyncThunk(
  'columns/getColumns',
  async ({ selectedBoardId, token }: IGetColumns) => {
    const res = await fetch(`${BASE_URL}/boards/${selectedBoardId}/columns`, {
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

export const addNewColumn = createAsyncThunk(
  'columns/addNewColumn',
  async ({ boardId, title, token }: IAddColumn) => {
    const response = await fetch(`${BASE_URL}/boards/${boardId}/columns`, {
      method: 'POST',
      body: JSON.stringify({ title: title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const updateColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({ columnData, boardId, columnId, token }: IUpdateColumn) => {
    const response = await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
      method: 'PUT',
      body: JSON.stringify(columnData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async ({ boardId, columnId, token }: IDeleteColumn) => {
    console.log(boardId, columnId, token);
    await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
);
