import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export type ICreateTask = {
  url: {
    boardId: string;
    columnId: string;
  };
  body: {
    title: string;
    description: string;
    userId: string;
  };
  token: string;
};

export type IGetTasks = Pick<ICreateTask, 'url' | 'token'>;

export const createTask = createAsyncThunk(
  'root/createTask',
  async ({ url, body, token }: ICreateTask, { rejectWithValue }) => {
    try {
      const { boardId, columnId } = url;
      const res = await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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

export const getTasks = createAsyncThunk(
  'root/getTasks',
  async ({ url, token }: IGetTasks, { rejectWithValue }) => {
    try {
      const { boardId, columnId } = url;
      const res = await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Произошла ошибка при получении списка задач');
      }

      const task = await res.json();
      console.log(task);
      return task;
    } catch (err) {
      return rejectWithValue((err as TypeError).message);
    }
  }
);
