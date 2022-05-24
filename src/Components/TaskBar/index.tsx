import { BarWrapper, BarTitle, BarDescription } from './styles';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Stack, Button } from '@mui/material';
import { useAppSelector } from '../../store/redux/redux';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from './../../store/redux/redux';
import { taskSlice } from '../../store/reducers/taskSlice';

const TaskBar = () => {
  const { taskDescription, isBar } = useAppSelector((state) => state.taskSlice);
  const { userId, title, description } = taskDescription;
  const { setIsBar } = taskSlice.actions;
  const dispatch = useAppDispatch();

  const closeBar = () => {
    dispatch(setIsBar(false));
  };

  return (
    <BarWrapper toggle={isBar} alignItems="center" justifyContent="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <TaskAltIcon fontSize="large" />
        <BarTitle variant="h4">{title}</BarTitle>
        <Button onClick={closeBar}>
          <CloseIcon fontSize="large" />
        </Button>
      </Stack>
      <BarDescription variant="h4">{description}</BarDescription>
      <BarTitle variant="h5" alignSelf="left">
        Author: {userId}
      </BarTitle>
    </BarWrapper>
  );
};

export default TaskBar;
