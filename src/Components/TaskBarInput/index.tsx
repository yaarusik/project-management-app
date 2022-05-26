import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../store/redux/redux';
import { sortTask } from '../../utils/sort/task';
import { useAppDispatch } from './../../store/redux/redux';
import { changeTask, getTasks } from './../../utils/api/tasks';
import { IFunc } from './types';
import { getColumns } from './../../utils/api/columns';

const TaskBarInput = ({ closeInput, updateTasks }: IFunc) => {
  const { taskDescription, isBar } = useAppSelector((state) => state.taskSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { order, description, userId, columnId, id } = taskDescription;
  const [title, setTitle] = useState('');

  const changeTitle = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  const onSave = async () => {
    if (token) {
      const updateTaskOptions = {
        url: {
          boardId: selectedBoardId,
          columnId: columnId,
          taskId: id,
        },
        body: {
          title: title,
          order: order,
          description: description,
          userId: userId,
          boardId: selectedBoardId,
          columnId: columnId,
        },
        token: token,
      };
      const taskOptions = {
        url: {
          boardId: selectedBoardId,
          columnId: columnId,
        },
        token,
      };
      await dispatch(changeTask(updateTaskOptions));
      const { meta, payload } = await dispatch(getTasks(taskOptions));
      if (meta.requestStatus === 'fulfilled') {
        console.log('get task', payload);
        dispatch(getColumns({ selectedBoardId, token }));
        // updateTasks(sortTask(payload));
        closeInput();
      }
    }
  };

  const onCancel = () => {
    closeInput();
  };
  return (
    <Box sx={{ padding: '10px', display: 'flex', flexDirection: 'row', width: '320px' }}>
      <TextField variant="outlined" placeholder="Enter title" onChange={changeTitle} />
      <Button variant="text" color="success" size="large" onClick={onSave}>
        Save
      </Button>
      <Button variant="text" color="info" size="large" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default TaskBarInput;
