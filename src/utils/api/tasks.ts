import { ISubmit } from '../../Pages/PageSignup/types';
import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

const requestHeaders = new Headers();
requestHeaders.set('Content-Type', 'application/json');

export const fetchOptions = {
  method: 'POST',
  headers: requestHeaders,
};

export interface ICreateTask {
  url: {
    boardId: string;
    columnId: string;
  };
  body: {
    title: string;
    description: string;
    userId: string;
  };
}

export const createTask = createAsyncThunk(
  'root/createTask',
  async ({ url, body }: ICreateTask, { rejectWithValue }) => {
    try {
      const { boardId, columnId } = url;
      const res = await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
        ...fetchOptions,
        body: JSON.stringify(body),
      });
      if (res.status === 401) {
        throw new Error('Вы не авторизованы');
      }
      const task = await res.json();
      return task;
    } catch (err) {
      return rejectWithValue((err as TypeError).message);
    }
  }
);
