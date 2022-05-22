import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface ITask {
  title?: string;
  author?: string;
}

import { TaskBody, TaskTitle, TaskHeader } from './style';

const Task = ({ title = 'task', author = 'authorName' }: ITask) => {
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
