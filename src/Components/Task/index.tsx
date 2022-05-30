import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { TaskBody, TaskTitle, TaskHeader, TaskAuthor } from './style';
import { ITaskProps } from './types';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { changeTask, deleteTask, getTasks, getUser } from '../../utils/api/tasks';
import { useRef, useState } from 'react';
import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { dndTypes } from '../../Pages/BoardPage';
import { Identifier } from 'dnd-core';
import ConfirmationModal from '../ConfirmationModal';

import { taskSlice } from './../../store/reducers/taskSlice';
import { useEffect } from 'react';
import { getColumns } from '../../utils/api/columns';
import { sortTask } from './../../utils/sort/task';
import Preloader from '../Preloader';

import { useTranslation } from 'react-i18next';
import { ITask } from '../../store/initialStates/types';


const Task = ({ title, userId, id, columnId, updateTasks, description, order }: ITaskProps) => {
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.authSlice);
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { setTaskDecription, setIsBar, setIsEditTitle, setIsEditDescription } = taskSlice.actions;
  const dispatch = useAppDispatch();
  const [hoverOrder, setHoverOrder] = useState(1);
  const [hoverColumnId, setHoverColumnId] = useState('');
  const [dragColumnId, setDragColumnId] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [authorName, setAuthorName] = useState('somebody');
  const [isPreloader, setIsPreloader] = useState(true);

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

      setHoverColumnId(hoverId);
      setHoverOrder(hoverIndex);

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
          updateTasks(sortTask(payload));
        })
        .then(async () => {
          const { payload } = await dispatch(getColumns({ selectedBoardId, token }));
        });
      setDragColumnId('');
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: dndTypes.TASK,
    item: { title, userId, id, columnId, description, order, updateTasks },
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
    if (token) {
      dispatch(getUser({ userId, token }))
        .then(({ payload }) => setAuthorName(payload.name))
        .then(() => setIsPreloader(false));
    }

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
        {isPreloader ? (
          <Preloader />
        ) : (
          <>
            <TaskHeader direction="row" alignItems="center" justifyContent="space-between">
              <TaskTitle onClick={openTaskInner} variant="subtitle1">
                {title}
              </TaskTitle>
              <IconButton onClick={changeOnOpen} aria-label="delete">
                <CloseIcon color="primary" />
              </IconButton>
            </TaskHeader>
            <TaskAuthor variant="body2">opened by {authorName}</TaskAuthor>
          </>
        )}
      </TaskBody>
      <ConfirmationModal
        flag={isOpen}
        cbClose={changeOnClose}
        cbOpen={changeOnOpen}
        cbHandler={removeTask}
        body={t('confirm.task.body')}
        title={t('confirm.task.title')}
      />
    </>
  );
};

export default Task;
