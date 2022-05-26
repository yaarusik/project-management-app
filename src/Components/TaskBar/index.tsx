import { BarWrapper, BarTitle, BarDescription } from './styles';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Stack, Button, IconButton } from '@mui/material';
import { useAppSelector } from '../../store/redux/redux';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from './../../store/redux/redux';
import { taskSlice } from '../../store/reducers/taskSlice';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import TaskBarInput from '../TaskBarInput';
import { ITaskBar } from './types';
import TaskBarTextarea from '../TaskBarTextarea';

const TaskBar = ({ updateTasks }: ITaskBar) => {
  const { taskDescription, isBar } = useAppSelector((state) => state.taskSlice);
  const { userId, title, description } = taskDescription;
  const { setIsBar, setTaskDecription } = taskSlice.actions;
  const dispatch = useAppDispatch();

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);

  const closeBar = () => {
    dispatch(setIsBar(false));
    dispatch(setTaskDecription({}));
  };

  const openInputField = () => setIsEditTitle(true);
  const closeInputField = () => setIsEditTitle(false);
  const openTextareaField = () => setIsEditDescription(true);
  const closeTextareaField = () => setIsEditDescription(false);

  const func = {
    closeInput: closeInputField,
    updateTasks: updateTasks,
    closeTextarea: closeTextareaField,
  };

  return (
    <BarWrapper toggle={isBar.toString()} alignItems="center" justifyContent="center">
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        {isEditTitle ? (
          <TaskBarInput {...func} />
        ) : (
          <>
            <TaskAltIcon fontSize="large" />
            <BarTitle variant="h4">{title}</BarTitle>
            <IconButton onClick={openInputField} aria-label="edit">
              <EditIcon color="primary" />
            </IconButton>
          </>
        )}
        <Button sx={{ position: 'absolute', right: 10, top: 16 }} onClick={closeBar}>
          <CloseIcon fontSize="large" />
        </Button>
      </Stack>
      {isEditDescription ? (
        <TaskBarTextarea {...func} />
      ) : (
        <>
          <BarDescription variant="h4">{description}</BarDescription>
          <IconButton onClick={openTextareaField} aria-label="edit">
            <EditIcon color="primary" />
          </IconButton>
        </>
      )}
      <BarTitle variant="h5" alignSelf="left">
        Author: {userId}
      </BarTitle>
    </BarWrapper>
  );
};

export default TaskBar;
