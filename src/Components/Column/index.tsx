import { Box, IconButton } from '@mui/material';
import { ColumnWrapper, Title, TitleWrapper } from './styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IColumn } from '../../store/initialState';
import InputTitleColumn from '../InputTitleColumn';
import { useAppDispatch } from '../../store/redux/redux';
import { setCurrentColumnId, setCurrentColumnOrder } from '../../store/reducers/columnSlice';
import { taskSlice } from './../../store/reducers/taskSlice';
import TaskModal from './../TaskModal/index';
import { useState } from 'react';

export const Column = ({ title, id, order }: IColumn) => {
  const { setTaskModal } = taskSlice.actions;
  const dispatch = useAppDispatch();
  const [isChangeTitle, setIsChangeTitle] = useState(false);

  const onClickTitle = () => {
    setIsChangeTitle(true);
    dispatch(setCurrentColumnId(id));
    dispatch(setCurrentColumnOrder(order));
  };

  const setFlagChangeTitle = (param: boolean) => {
    setIsChangeTitle(param);
  };

  const addTask = () => {
    dispatch(setTaskModal(true));
  };

  return (
    <ColumnWrapper>
      <Box>
        {isChangeTitle ? (
          <InputTitleColumn setFlagChangeTitle={setFlagChangeTitle} />
        ) : (
          <TitleWrapper>
            <Title onClick={onClickTitle}>{title}</Title>
            <Box>
              <IconButton onClick={addTask} aria-label="add">
                <AddIcon color="secondary" />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon color="secondary" />
              </IconButton>
            </Box>
          </TitleWrapper>
        )}
      </Box>
      <TaskModal />
    </ColumnWrapper>
  );
};
