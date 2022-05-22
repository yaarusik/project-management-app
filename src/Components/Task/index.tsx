import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TaskBody, TaskTitle, TaskHeader } from './style';
import { ITaskProps } from './types';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { deleteTask, getTasks } from '../../utils/api/tasks';

const Task = ({ title, author, id, columnId, updateTask }: ITaskProps) => {
  const { token } = useAppSelector((state) => state.authSlice);
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const dispatch = useAppDispatch();

  const removeTask = async () => {
    if (token) {
      const taskOptions = {
        url: {
          boardId: selectedBoardId,
          columnId: columnId,
          taskId: id,
        },
        token,
      };

      await dispatch(deleteTask(taskOptions));
      const { meta, payload } = await dispatch(getTasks(taskOptions));
      if (meta.requestStatus === 'fulfilled') {
        updateTask(payload);
      }
    } else {
      // вы не авторизованы
    }
  };
  return (
    <TaskBody justifyContent="space-between">
      <TaskHeader direction="row" alignItems="center" justifyContent="space-between">
        <TaskTitle variant="subtitle1">{title}</TaskTitle>
        <IconButton onClick={removeTask} aria-label="delete">
          <DeleteIcon color="primary" />
        </IconButton>
      </TaskHeader>
      <TaskTitle variant="body2">opened by {author}</TaskTitle>
    </TaskBody>
  );
};

export default Task;
