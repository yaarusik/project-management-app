import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from './../../store/redux/redux';

import { Button, Input, Stack } from '@mui/material';

import { Submit } from '../../Pages/PageSignup/styles';
import { ModalBody, DescriptionArea } from './styles';
import { IModalParam, ITaskOptions } from './types';
import { createTask } from './../../utils/api/tasks';
import { SubmitHandler, useForm } from 'react-hook-form';

const TaskModal = ({ id, isModal, closeModal, addTask }: ITaskOptions) => {
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { userData, token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IModalParam>({
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<IModalParam> = async ({ title, textarea }) => {
    closeModal();
    if (token) {
      const taskOptions = {
        url: {
          boardId: selectedBoardId,
          columnId: id,
        },
        body: {
          title: title,
          description: textarea,
          userId: userData.userId,
        },
        token,
      };
      const { meta, payload } = await dispatch(createTask(taskOptions));
      if (meta.requestStatus === 'fulfilled') {
        addTask(payload);
      }
    }
  };

  return (
    <div>
      {isModal && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isModal}
          onClose={closeModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isModal}>
            <ModalBody onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography id="transition-modal-title" variant="h5" component="h2">
                  Create new task
                </Typography>
                <Button onClick={closeModal}>
                  <CloseIcon />
                </Button>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Typography variant="h6" component="h2">
                  Task title
                </Typography>
                <Input
                  placeholder="Title is required"
                  inputProps={{
                    maxLength: 15,
                    ...register('title', {
                      required: true,
                    }),
                  }}
                />
              </Stack>
              <DescriptionArea
                placeholder="Describe is required"
                {...register('textarea', {
                  required: true,
                })}
                maxLength={100}
              />
              <Submit disabled={!isValid} type="submit">
                Add task
              </Submit>
            </ModalBody>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default TaskModal;
