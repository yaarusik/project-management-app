import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAddColumn, IGetColumns } from './types';

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
  async ({ boardId, columnData, token }: IAddColumn) => {
    const response = await fetch(`${BASE_URL}/boards/${boardId}/columns`, {
      method: 'POST',
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
