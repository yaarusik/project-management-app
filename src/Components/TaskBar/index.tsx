import { BarWrapper, BarTitle, BarDescription } from './styles';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Stack, Button, IconButton, Box } from '@mui/material';
import { useAppSelector } from '../../store/redux/redux';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from './../../store/redux/redux';
import { taskSlice } from '../../store/reducers/taskSlice';
import EditIcon from '@mui/icons-material/Edit';
import TaskBarInput from '../TaskBarInput';
import TaskBarTextarea from '../TaskBarTextarea';

const TaskBar = () => {
  const { taskDescription, isBar, isEditTitle, isEditDescription } = useAppSelector(
    (state) => state.taskSlice
  );
  const { title, description } = taskDescription;
  const { setIsBar, setTaskDecription, setIsEditTitle, setIsEditDescription } = taskSlice.actions;
  const dispatch = useAppDispatch();

  const closeBar = () => {
    dispatch(setIsBar(false));
    dispatch(setTaskDecription({}));
  };

  const openInputField = () => dispatch(setIsEditTitle(true));
  const closeInputField = () => dispatch(setIsEditTitle(false));
  const openTextareaField = () => dispatch(setIsEditDescription(true));
  const closeTextareaField = () => dispatch(setIsEditDescription(false));

  return (
    <BarWrapper toggle={isBar.toString()} alignItems="center" justifyContent="center">
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        {isEditTitle ? (
          <TaskBarInput closeInput={closeInputField} />
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
      <Box sx={{ fontSize: 30 }}>Description</Box>
      {isEditDescription ? (
        <TaskBarTextarea closeTextarea={closeTextareaField} />
      ) : (
        <>
          <BarDescription variant="h4">
            <Box>{description}</Box>
            <IconButton onClick={openTextareaField} aria-label="edit">
              <EditIcon color="primary" />
            </IconButton>
          </BarDescription>
        </>
      )}
    </BarWrapper>
  );
};

export default TaskBar;
