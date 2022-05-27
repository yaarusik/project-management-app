import { Button, TextField } from '@mui/material';
import { useAppSelector } from '../../store/redux/redux';
import { useAppDispatch } from './../../store/redux/redux';
import { changeTask, getTasks } from './../../utils/api/tasks';
import { IFunc } from './types';
import { getColumns } from './../../utils/api/columns';
import { taskSlice } from '../../store/reducers/taskSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from './styles';
import { BarInput } from '../TaskBarInput/types';

const TaskBarInput = ({ closeInput }: IFunc) => {
  const { taskDescription } = useAppSelector((state) => state.taskSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { order, description, userId, columnId, id } = taskDescription;
  const { setTaskDecription } = taskSlice.actions;

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<BarInput>({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSave: SubmitHandler<BarInput> = async ({ title }) => {
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
        closeInput();
      }
    } else {
    }
  };

  const onCancel = () => closeInput();

  return (
    <Form onSubmit={handleSubmit(onSave)}>
      <TextField
        inputProps={{
          maxLength: 15,
          ...register('title', {
            required: true,
          }),
        }}
        variant="outlined"
        placeholder="Enter title"
      />
      <Button disabled={!isValid} type="submit" variant="text" color="success" size="large">
        Save
      </Button>
      <Button variant="text" color="info" size="large" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default TaskBarInput;
