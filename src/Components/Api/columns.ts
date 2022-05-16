import { BASE_URL } from '../../constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getColumns = createAsyncThunk('root/getColumns', async (boardID: string) => {
  const res = await fetch(`${BASE_URL}/boards/${boardID}/columns`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmZDUwMjYxMS1kZGE0LTQzYTYtOTE2YS1jZTcxOTU2ZjFlZTgiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIzNDUyMDZ9.X3pw_uWTXBzbUqXLE8jlkTO8_ldVNav4iLYY_83Jjyw`,
    },
  });

  const data = await res.json();
  console.log(data);

  return data;
});

type INewColomnData = {
  boardID: string;
  titleName: string;
  orderNum: number;
};

export const addNewColumn = createAsyncThunk(
  'root/addNewColumn',
  async (newColumnData: INewColomnData) => {
    const response = await fetch(`${BASE_URL}/${newColumnData.boardID}/columns`, {
      method: 'POST',
      body: JSON.stringify({ title: newColumnData.titleName, order: newColumnData.orderNum }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmZDUwMjYxMS1kZGE0LTQzYTYtOTE2YS1jZTcxOTU2ZjFlZTgiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIzNDUyMDZ9.X3pw_uWTXBzbUqXLE8jlkTO8_ldVNav4iLYY_83Jjyw`,
      },
    });
    const data = await response.json();
    return data;
  }
);
