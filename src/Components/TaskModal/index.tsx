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

const TaskModal = ({ id, isModal, closeModal }: ITaskOptions) => {
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { userData } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const addTask = async () => {
    closeModal();
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
    };
    const result = await dispatch(createTask(taskOptions));

    console.log('result', result);

    // console.log('columnId >', id);
    // console.log('columnOrder >', order);
    // console.log('selectedBoardId >', selectedBoardId);
    // console.log('description >', description);
    // console.log('title >', title);
    // console.log('user data >', userData.userId);
  };

  return (
    <div>
      {isModal && (
        <Modal
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
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
                <Input onChange={(e) => setTitle(e.target.value)} />
              </Stack>
              <DescriptionArea
                maxRows={4}
                minRows={3}
                aria-label="maximum height"
                placeholder="describe"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  minWidth: '50%',
                  minHeight: '40px',
                }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Submit onClick={addTask}>Add task</Submit>
            </ModalBody>
          </Fade>
        </Modal>
      )}
    </div>
  );
};

export default TaskModal;
