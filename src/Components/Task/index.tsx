import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TaskBody, TaskTitle, TaskHeader, TaskAuthor } from './style';
import { ITaskProps } from './types';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { deleteTask, getTasks } from '../../utils/api/tasks';
import { taskSlice } from './../../store/reducers/taskSlice';
import { useEffect } from 'react';

const Task = ({ title, userId, id, columnId, updateTask, description }: ITaskProps) => {
  const { token } = useAppSelector((state) => state.authSlice);
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { setTaskDecription, setIsBar } = taskSlice.actions;
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
        dispatch(setIsBar(false));
        dispatch(setTaskDecription({}));
      }
    } else {
      // вы не авторизованы
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setIsBar(false));
      dispatch(setTaskDecription({}));
    };
  });

  const openTaskInner = () => {
    const taskOptions = { userId, title, description };
    dispatch(setTaskDecription(taskOptions));
    dispatch(setIsBar(true));
  };
  return (
    <TaskBody justifyContent="space-between">
      <TaskHeader direction="row" alignItems="center" justifyContent="space-between">
        <TaskTitle onClick={openTaskInner} variant="subtitle1">
          {title}
        </TaskTitle>
        <IconButton onClick={removeTask} aria-label="delete">
          <DeleteIcon color="primary" />
        </IconButton>
      </TaskHeader>
      <TaskAuthor variant="body2">opened by {userId}</TaskAuthor>
    </TaskBody>
  );
};

export default Task;
