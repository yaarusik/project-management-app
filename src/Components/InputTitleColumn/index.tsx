import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/redux/redux';
import { updateColumn, getColumns } from '../../utils/api/columns';
import { IInputTitleColumn } from './types';
import { useTranslation } from 'react-i18next';

const InputTitleColumn = ({ setFlagChangeTitle }: IInputTitleColumn) => {
  const { t } = useTranslation();
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
    <Box
      sx={{
        padding: '10px',
        gap: '10px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Enter title"
        onChange={(e) => handleChange(e)}
      />
      <Button variant="text" color="success" size="small" onClick={onSubmit}>
        {t('button.save')}
      </Button>
      <Button variant="text" color="error" size="small" onClick={onCancel}>
        {t('button.cancel')}
      </Button>
    </Box>
  );
};

export default InputTitleColumn;
