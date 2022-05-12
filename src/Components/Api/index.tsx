import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getBoards = createAsyncThunk('root/getBoards', async () => {
  const res = await fetch(`${BASE_URL}/boards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmZDUwMjYxMS1kZGE0LTQzYTYtOTE2YS1jZTcxOTU2ZjFlZTgiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIzNDUyMDZ9.X3pw_uWTXBzbUqXLE8jlkTO8_ldVNav4iLYY_83Jjyw`,
    },
  });

  // if (res.status === 401) {
  // }

  const data = await res.json();

  return data;
});

export const addNewBoard = createAsyncThunk('root/addNewBoard', async (titleName: string) => {
  console.log('title', JSON.stringify(titleName));
  const response = await fetch(`${BASE_URL}/boards`, {
    method: 'POST',
    body: JSON.stringify({ title: titleName }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmZDUwMjYxMS1kZGE0LTQzYTYtOTE2YS1jZTcxOTU2ZjFlZTgiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIzNDUyMDZ9.X3pw_uWTXBzbUqXLE8jlkTO8_ldVNav4iLYY_83Jjyw`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
});
