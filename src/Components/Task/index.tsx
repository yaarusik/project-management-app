import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TaskBody, TaskTitle, TaskHeader } from './style';
import { ITaskProps } from './types';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { changeTask, deleteTask, getTasks } from '../../utils/api/tasks';
import { useRef, useState } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { dndTypes } from '../../Pages/BoardPage';
import { Identifier } from 'dnd-core';
import { ITask } from '../../store/initialStates/types';

const Task = ({ title, author, id, columnId, order, description, updateTask }: ITaskProps) => {
  const { token } = useAppSelector((state) => state.authSlice);
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const dispatch = useAppDispatch();
  const [hoverOrder, setHoverOrder] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<ITaskProps, void, { handlerId: Identifier | null }>({
    accept: dndTypes.TASK,
    hover(item: ITaskProps, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.order;
      const hoverIndex = order;

      setHoverOrder(dragIndex);

      item.order = hoverIndex as number;
    },
    drop(item: ITaskProps) {
      const updateTaskOptions = {
        url: {
          boardId: selectedBoardId,
          columnId: columnId,
          taskId: item.id,
        },
        body: {
          title: item.title,
          order: hoverOrder,
          description: item.description,
          userId: item.author,
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
      dispatch(changeTask(updateTaskOptions)).then(async () => {
        const { payload } = await dispatch(getTasks(taskOptions));
        updateTask(payload.sort((a: ITask, b: ITask) => a.order - b.order));
      });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: dndTypes.TASK,
    item: () => {
      return { id, title, order, description, author };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const removeTask = async () => {
    if (token) {
      const taskOptions = {
        url: {
          boardId: selectedBoardId,
          columnId: columnId,
          taskId: id,
        },
        token,
      };

      await dispatch(deleteTask(taskOptions));
      const { meta, payload } = await dispatch(getTasks(taskOptions));
      if (meta.requestStatus === 'fulfilled') {
        updateTask(payload);
      }
    } else {
      // вы не авторизованы
    }
  };
  return (
    <TaskBody
      justifyContent="space-between"
      ref={ref}
      style={{ opacity: opacity, cursor: 'move' }}
      data-handler-id={handlerId}
    >
      <TaskHeader direction="row" alignItems="center" justifyContent="space-between">
        <TaskTitle variant="subtitle1">{title}</TaskTitle>
        <IconButton onClick={removeTask} aria-label="delete">
          <DeleteIcon color="primary" />
        </IconButton>
      </TaskHeader>
      <TaskTitle variant="body2">opened by {author}</TaskTitle>
    </TaskBody>
  );
};

export default Task;
