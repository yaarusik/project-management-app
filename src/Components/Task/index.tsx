import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { TaskBody, TaskTitle, TaskHeader, TaskAuthor } from './style';
import { ITaskProps } from './types';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { changeTask, deleteTask, getTasks } from '../../utils/api/tasks';
import { useRef, useState } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { dndTypes } from '../../Pages/BoardPage';
import { Identifier } from 'dnd-core';
import ConfirmationModal from '../ConfirmationModal';

import { taskSlice } from './../../store/reducers/taskSlice';
import { useEffect } from 'react';
import { sortTask } from './../../utils/sort/task';

const Task = ({ title, userId, id, columnId, updateTasks, description, order }: ITaskProps) => {
  const { token } = useAppSelector((state) => state.authSlice);
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { setTaskDecription, setIsBar, setIsEditTitle, setIsEditDescription } = taskSlice.actions;
  const dispatch = useAppDispatch();
  const [hoverOrder, setHoverOrder] = useState(1);
  const [isOpen, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<ITaskProps, void, { handlerId: Identifier | null }>({
    accept: dndTypes.TASK,
    hover(item: ITaskProps) {
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
          userId: item.userId,
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
        updateTasks(sortTask(payload));
      });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: dndTypes.TASK,
    item: () => {
      return { id, title, order, description, userId };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const changeOnOpen = () => setOpen(true);
  const changeOnClose = () => setOpen(false);

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
        updateTasks(payload);
        dispatch(setIsBar(false));
        dispatch(setTaskDecription({}));
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setIsBar(false));
      dispatch(setTaskDecription({}));
    };
  }, []);

  const openTaskInner = () => {
    const taskOptions = { userId, title, description, columnId, order, id };
    dispatch(setIsEditTitle(false));
    dispatch(setIsEditDescription(false));
    dispatch(setTaskDecription(taskOptions));
    dispatch(setIsBar(true));
  };
  return (
    <>
      <TaskBody
        justifyContent="space-between"
        ref={ref}
        style={{ opacity: opacity, cursor: 'move' }}
        data-handler-id={handlerId}
      >
        <TaskHeader direction="row" alignItems="center" justifyContent="space-between">
          <TaskTitle onClick={openTaskInner} variant="subtitle1">
            {title}
          </TaskTitle>
          <IconButton onClick={changeOnOpen} aria-label="delete">
            <DeleteIcon color="primary" />
          </IconButton>
        </TaskHeader>
        <TaskAuthor variant="body2">opened by {userId}</TaskAuthor>
      </TaskBody>
      <ConfirmationModal
        flag={isOpen}
        cbClose={changeOnClose}
        cbOpen={changeOnOpen}
        cbHandler={removeTask}
        body="Do you really want to remove this task?"
        title="Remove Task"
      />
    </>
  );
};

export default Task;
