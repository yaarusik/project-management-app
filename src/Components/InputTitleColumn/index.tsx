import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/redux/redux';
import { updateColumn, getColumns } from '../../utils/api/columns';
import { IInputTitleColumn } from './types';

const InputTitleColumn = ({ setFlagChangeTitle }: IInputTitleColumn) => {
  const { currentColumnOrder, currentColumnId } = useAppSelector((state) => state.columnSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const [newTitle, setNewTitle] = useState<string>();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent) => {
    setNewTitle((e.target as HTMLInputElement).value);
  };

  const onSubmit = async () => {
    setFlagChangeTitle(false);

    const updateColumnData = {
      title: newTitle,
      order: currentColumnOrder,
    };

    const columnData = {
      boardId: selectedBoardId,
      columnId: currentColumnId,
      columnData: updateColumnData,
      token: token,
    };

    await dispatch(updateColumn(columnData));
    dispatch(getColumns({ selectedBoardId, token }));
  };

  const onCancel = () => {
    setFlagChangeTitle(false);
  };

  return (
    <Box sx={{ padding: '10px', display: 'flex', flexDirection: 'row', width: '250px' }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Enter title"
        onChange={(e) => handleChange(e)}
      />
      <Button variant="text" color="success" size="small" onClick={onSubmit}>
        Submit
      </Button>
      <Button variant="text" color="error" size="small" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default InputTitleColumn;
