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
import { ITask } from '../../store/initialStates/types';
import ConfirmationModal from '../ConfirmationModal';

import { taskSlice } from './../../store/reducers/taskSlice';
import { useEffect } from 'react';
import { getBoardById } from '../../utils/api/boards';
import { getColumns } from '../../utils/api/columns';

const Task = ({ title, userId, id, columnId, updateTask, description, order }: ITaskProps) => {
  const { token } = useAppSelector((state) => state.authSlice);
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { setTaskDecription, setIsBar } = taskSlice.actions;
  const dispatch = useAppDispatch();
  const [hoverOrder, setHoverOrder] = useState(1);
  const [hoverColumnId, setHoverColumnId] = useState('');
  const [dragColumnId, setDragColumnId] = useState('');
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

      const dragId = item.columnId;
      const hoverId = columnId;

      if (dragId != hoverId) {
        setDragColumnId(dragId);
      }

      setHoverOrder(dragIndex);
      setHoverColumnId(hoverId);

      item.order = hoverIndex as number;
      item.columnId = hoverId as string;
    },
    drop(item: ITaskProps) {
      const updateTaskOptions = {
        url: {
          boardId: selectedBoardId,
          columnId: dragColumnId ? dragColumnId : hoverColumnId,
          taskId: item.id,
        },
        body: {
          title: item.title,
          order: hoverOrder,
          description: item.description,
          userId: item.userId,
          boardId: selectedBoardId,
          columnId: hoverColumnId,
        },
        token: token,
      };

      const newTaskOptions = {
        url: {
          boardId: selectedBoardId,
          columnId: columnId,
        },
        token,
      };

      dispatch(changeTask(updateTaskOptions))
        .then(async () => {
          const { payload } = await dispatch(getTasks(newTaskOptions));
          updateTask(payload.sort((a: ITask, b: ITask) => a.order - b.order));
        })
        .then(() => {
          if (dragColumnId) dispatch(getColumns({ selectedBoardId, token }));
        });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: dndTypes.TASK,
    item: { title, userId, id, columnId, description, order, updateTask },
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
        updateTask(payload);
        dispatch(setIsBar(false));
        dispatch(setTaskDecription({}));
      }
    } else {
      // вы не авторизованы
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setIsBar(false));
      dispatch(setTaskDecription({}));
    };
  });

  const openTaskInner = () => {
    const taskOptions = { userId, title, description };
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
