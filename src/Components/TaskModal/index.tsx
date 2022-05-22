import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';
import { useAppSelector, useAppDispatch } from './../../store/redux/redux';

import { Button, Input, Stack } from '@mui/material';

import { Submit } from '../../Pages/PageSignup/styles';
import { useState } from 'react';
import { ModalBody, DescriptionArea } from './styles';
import { ITaskOptions } from './types';
import { createTask } from './../../utils/api/tasks';

const TaskModal = ({ id, isModal, closeModal, addTask }: ITaskOptions) => {
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { userData, token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const TaskFetch = async () => {
    closeModal();
    if (token) {
      const taskOptions = {
        url: {
          boardId: selectedBoardId,
          columnId: id,
        },
        body: {
          title: title,
          description: description,
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
            <ModalBody>
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
                <Input inputProps={{ maxLength: 15 }} onChange={(e) => setTitle(e.target.value)} />
              </Stack>
              <DescriptionArea
                placeholder="Describe"
                maxLength={50}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Submit onClick={TaskFetch}>Add task</Submit>
            </ModalBody>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default TaskModal;
