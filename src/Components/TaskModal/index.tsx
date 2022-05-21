import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from './../../store/redux/redux';
import { taskSlice } from './../../store/reducers/taskSlice';
import { Button, Stack, TextareaAutosize } from '@mui/material';
import styled from 'styled-components';
import { Submit } from '../../Pages/PageSignup/styles';
import { useState } from 'react';

const ModalBody = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  border: 2px solid rgba(2, 129, 237, 1);
  border-radius: 5px;
  background-color: #fff;
  padding: 10px;
`;

const DescriptionArea = styled(TextareaAutosize)`
  width: 400px;
`;

const TaskModal = () => {
  const { isTaskModal } = useAppSelector((state) => state.taskSlice);
  const [description, setDescription] = useState('');
  const { setTaskModal } = taskSlice.actions;
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(setTaskModal(false));
  const addTask = () => {
    handleClose();
    console.log(description);
  };

  return (
    <div>
      {isTaskModal && (
        <Modal
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={isTaskModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isTaskModal}>
            <ModalBody>
              <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                <Typography id="transition-modal-title" variant="h5" component="h2">
                  Create new task
                </Typography>
                <Button onClick={handleClose}>
                  <CloseIcon />
                </Button>
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
