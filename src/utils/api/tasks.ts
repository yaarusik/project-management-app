import { ISubmit } from '../../Pages/PageSignup/types';
import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

const requestHeaders = new Headers();
requestHeaders.set('Content-Type', 'application/json');

export const fetchOptions = {
  method: 'POST',
  headers: requestHeaders,
};

export const createTask = createAsyncThunk(
  'root/createTask',
  async (data: ISubmit, { rejectWithValue }) => {
    try {
      await fetch(`${BASE_URL}/signup`, {
        ...fetchOptions,
        body: JSON.stringify(data),
      });
    } catch (err) {
      return rejectWithValue((err as TypeError).message);
    }
  }
);
