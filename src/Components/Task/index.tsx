import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TaskBody, TaskTitle, TaskHeader } from './style';
import { ITaskProps } from './types';

const Task = ({ title, author }: ITaskProps) => {
  return (
    <TaskBody justifyContent="space-between">
      <TaskHeader direction="row" alignItems="center" justifyContent="space-between">
        <TaskTitle variant="subtitle1">{title}</TaskTitle>
        <IconButton aria-label="delete">
          <DeleteIcon color="primary" />
        </IconButton>
      </TaskHeader>
      <TaskTitle variant="body2">opened by {author}</TaskTitle>
    </TaskBody>
  );
};

export default Task;
