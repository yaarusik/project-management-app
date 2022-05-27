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
  token: string | null;
};

export type IUpdateTask = {
  url: {
    boardId: string;
    columnId: string;
    taskId: string;
  };
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
  };
  token: string | null;
};

export type IDeleteTask = {
  url: {
    boardId: string;
    columnId: string;
    taskId: string;
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
      return task;
    } catch (err) {
      return rejectWithValue((err as TypeError).message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'root/deleteTask',
  async ({ url, token }: IDeleteTask, { rejectWithValue }) => {
    try {
      const { boardId, columnId, taskId } = url;
      const res = await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Произошла ошибка при удалении задачи');
      }
    } catch (err) {
      return rejectWithValue((err as TypeError).message);
    }
    // await fetch(`${BASE_URL}/boards/${boardId}/columns/${columnId}`, {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
  }
);

export const changeTask = createAsyncThunk(
  'root/updateTask',
  async ({ url, body, token }: IUpdateTask) => {
    const { boardId, columnId, taskId } = url;
    const response = await fetch(
      `${BASE_URL}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
);
