import { ISubmit } from '../../Pages/PageSignup/types';
import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthorization } from '../../Pages/PageLogin/types';

const requestHeaders = new Headers();
requestHeaders.set('Content-Type', 'application/json');

export const fetchOptions = {
  method: 'POST',
  headers: requestHeaders,
};

export const registration = createAsyncThunk(
  'root/registration',
  async (data: ISubmit, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        ...fetchOptions,
        body: JSON.stringify(data),
      });
      if (res.status === 409) {
        throw new Error('Данный логин уже существует');
      }
      const userData = await res.json();
      return userData;
    } catch (err) {
      return rejectWithValue((err as TypeError).message);
    }
  }
);

export const authorization = createAsyncThunk(
  'root/authorization',
  async (data: ISubmit | IAuthorization, { rejectWithValue }) => {
    try {
      const { login, password } = data;
      const res = await fetch(`${BASE_URL}/signin`, {
        ...fetchOptions,
        body: JSON.stringify({ login, password }),
      });

      if (res.status === 403) {
        throw new Error('Проверьте логин или пароль');
      }

      const loginData = await res.json();

      return loginData;
    } catch (err) {
      return rejectWithValue((err as TypeError).message);
    }
  }
);
