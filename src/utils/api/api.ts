import { ISubmit } from '../../Pages/PageSignup/indexTypes';
import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAuthorization } from '../../Pages/PageLogin/indexTypes';

const fetchOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
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
        console.log('Пользователь с таким логином уже существует');
      }
    } catch (err) {
      console.log(err);
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
        console.log('Что-то пошло не так');
      }

      const loginData = await res.json();

      console.log('loginData >', loginData);
    } catch (err) {
      console.log(err);
      return rejectWithValue((err as TypeError).message);
    }
  }
);
