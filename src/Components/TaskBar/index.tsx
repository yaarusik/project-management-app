import { BarWrapper, BarTitle, BarDescription } from './styles';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Stack } from '@mui/material';
import { useAppSelector } from '../../store/redux/redux';

const TaskBar = () => {
  const { taskDescription } = useAppSelector((state) => state.taskSlice);
  const { userId, title, description } = taskDescription;

  return (
    <BarWrapper alignItems="center" justifyContent="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <TaskAltIcon fontSize="large" />
        <BarTitle variant="h4">{title}</BarTitle>
      </Stack>
      <BarDescription variant="h4">{description}</BarDescription>
      <BarTitle variant="h5" alignSelf="left">
        Author: {userId}
      </BarTitle>
    </BarWrapper>
  );
};

export default TaskBar;
