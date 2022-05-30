import { Box, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { getColumns } from '../../utils/api/columns';
import { changeTask, getTasks } from '../../utils/api/tasks';

import { DescriptionArea, DescriptionWrapper } from './styles';
import { taskSlice } from './../../store/reducers/taskSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BarTextArea, IFunc } from './types';

const TaskBarTextarea = ({ closeTextarea }: IFunc) => {
  const { taskDescription } = useAppSelector((state) => state.taskSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { order, title, userId, columnId, id } = taskDescription;
  const { setTaskDecription } = taskSlice.actions;

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<BarTextArea>({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSave: SubmitHandler<BarTextArea> = async ({ description }) => {
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
      const { meta } = await dispatch(getTasks(taskOptions));

      if (meta.requestStatus === 'fulfilled') {
        dispatch(getColumns({ selectedBoardId, token }));
        dispatch(
          setTaskDecription({
            title,
            order,
            description,
            userId,
            columnId,
            id,
          })
        );
      }
      closeTextarea();
    }
  };

  const onCancel = () => {
    closeTextarea();
  };
  return (
    <DescriptionWrapper onSubmit={handleSubmit(onSave)}>
      <DescriptionArea
        {...register('description', {
          required: true,
        })}
        maxLength={80}
        placeholder="Enter description"
      />
      <Box>
        <Button disabled={!isValid} type="submit" variant="text" color="success" size="large">
          Save
        </Button>
        <Button variant="text" color="info" size="large" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </DescriptionWrapper>
  );
};

export default TaskBarTextarea;
