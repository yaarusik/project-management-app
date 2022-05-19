import { Box, IconButton } from '@mui/material';
import { ColumnWrapper, Title, TitleWrapper } from './styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IColumn } from '../../store/initialState';
import { useAppDispatch } from '../../store/redux/redux';
import { taskSlice } from './../../store/reducers/taskSlice';
import TaskModal from './../TaskModal/index';

export const Column = ({ title }: IColumn) => {
  const { setTaskModal } = taskSlice.actions;
  const dispatch = useAppDispatch();

  const addTask = () => {
    dispatch(setTaskModal(true));
  };
  return (
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
      <TaskModal />
    </ColumnWrapper>
  );
};
