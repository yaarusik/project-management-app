import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

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

type IColumnData = {
  title: string;
  order: number;
};

type IAddColumn = {
  boardId: string;
  columnData: IColumnData;
};

export const addNewColumn = createAsyncThunk(
  'columns/addNewColumn',
  async (columnData: IAddColumn) => {
    const response = await fetch(`${BASE_URL}/boards/${columnData.boardId}/columns`, {
      method: 'POST',
      body: JSON.stringify(columnData.columnData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    return data;
  }
);
