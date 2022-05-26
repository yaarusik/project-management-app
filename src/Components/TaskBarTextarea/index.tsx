import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { changeTask, getTasks } from '../../utils/api/tasks';
import { sortTask } from '../../utils/sort/task';
import { IFunc } from '../TaskBarInput/types';
import { DescriptionArea } from './styles';

const TaskBarTextarea = ({ closeTextarea }: IFunc) => {
  const { taskDescription, isBar } = useAppSelector((state) => state.taskSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { order, title, userId, columnId, id } = taskDescription;
  const [description, setDescription] = useState('');

  const changeDescription = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(target.value);
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
        closeTextarea();
      }
    }
  };

  const onCancel = () => {
    closeTextarea();
  };
  return (
    <Box sx={{ padding: '10px', display: 'flex', flexDirection: 'row', width: '320px' }}>
      <DescriptionArea maxLength={80} onChange={changeDescription} />
      <Button variant="text" color="success" size="large" onClick={onSave}>
        Save
      </Button>
      <Button variant="text" color="info" size="large" onClick={onCancel}>
        Cancel
      </Button>
    </Box>
  );
};

export default TaskBarTextarea;
