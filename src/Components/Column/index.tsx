import { Box, IconButton } from '@mui/material';
import { ColumnWrapper, Title, TitleWrapper } from './styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IColumn } from '../../store/initialState';

import TaskModal from './../TaskModal/index';
import { useState } from 'react';

export const Column = ({ title, id, order }: IColumn) => {
  const [isModal, setIsModal] = useState(false);

  const addTask = () => {
    openModal();
  };

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const modalOptions = {
    id,
    isModal,
    closeModal: closeModal,
  };

  return (
    <>
      <TaskModal {...modalOptions} />
      <ColumnWrapper>
        <Box>
          <TitleWrapper>
            <Title>{title}</Title>
            <Box>
              <IconButton onClick={addTask} aria-label="add">
                <AddIcon color="secondary" />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon color="secondary" />
              </IconButton>
            </Box>
          </TitleWrapper>
        </Box>
      </ColumnWrapper>
    </>
  );
};
