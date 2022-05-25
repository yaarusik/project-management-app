import { useEffect, useRef, useState } from 'react';
import { useDrag, DragSourceMonitor, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';

import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { ColumnWrapper, Title, TitleWrapper } from './styles';
import { TasksWrapper } from '../Task/style';

import { ITask } from '../../store/initialStates/types';
import { dndTypes } from '../../Pages/BoardPage';

import InputTitleColumn from '../InputTitleColumn';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { setCurrentColumnId, setCurrentColumnOrder } from '../../store/reducers/columnSlice';
import { IColumn } from '../../store/initialState';

import TaskModal from './../TaskModal';
import Task from './../Task';

import { getTasks } from '../../utils/api/tasks';
import ConfirmationModal from '../ConfirmationModal';
import { deleteColumn, getColumns, updateColumn } from '../../utils/api/columns';

export const Column = ({ title, id, order }: IColumn) => {
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  // заглушка
  const columnId = id;

  const [isChangeTitle, setIsChangeTitle] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [hoverOrder, setHoverOrder] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<IColumn, void, { handlerId: Identifier | null }>({
    accept: dndTypes.COLUMN,
    hover(item: IColumn, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.order;
      const hoverIndex = order;

      setHoverOrder(dragIndex);

      item.order = hoverIndex as number;
    },
    drop(item: IColumn) {
      const columnData = {
        boardId: selectedBoardId,
        columnId: item.id,
        columnData: { title: item.title, order: hoverOrder },
        token: token,
      };
      dispatch(updateColumn(columnData)).then(() =>
        dispatch(getColumns({ selectedBoardId, token }))
      );
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: dndTypes.COLUMN,
    item: () => {
      return { id, title, order };
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const [isOpen, setOpen] = useState(false);
  const changeOnOpen = () => {
    setOpen(true);
  };

  const changeOnClose = () => {
    setOpen(false);
  };

  const onClickTitle = () => {
    setIsChangeTitle(true);
    dispatch(setCurrentColumnId(id));
    dispatch(setCurrentColumnOrder(order));
  };

  useEffect(() => {
    if (token) {
      const fetchTasks = async () => {
        const taskOptions = {
          url: {
            boardId: selectedBoardId,
            columnId: id,
          },
          token,
        };

        const { meta, payload } = await dispatch(getTasks(taskOptions));
        if (meta.requestStatus === 'fulfilled') {
          setTasks(payload);
        }
      };
      fetchTasks();
    } else {
      // вы не авторизованы
    }
  }, []);

  const setFlagChangeTitle = (param: boolean) => {
    setIsChangeTitle(param);
  };

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);
  const addTask = (task: ITask) => setTasks((prev) => [...prev, task]);

  const modalOptions = {
    id,
    isModal,
    closeModal: closeModal,
    addTask: addTask,
  };

  const removeColumn = async () => {
    if (token) {
      const data = {
        boardId: selectedBoardId,
        columnId: id,
        token: token,
      };
      await dispatch(deleteColumn(data));
      dispatch(getColumns({ selectedBoardId, token }));
    }
  };

  return (
    <>
      <TaskModal {...modalOptions} />
      <ColumnWrapper
        ref={ref}
        style={{ opacity: opacity, cursor: 'move' }}
        data-handler-id={handlerId}
      >
        <Box>
          {isChangeTitle ? (
            <InputTitleColumn setFlagChangeTitle={setFlagChangeTitle} />
          ) : (
            <TitleWrapper>
              <Title>{title}</Title>
              <Box>
                <IconButton onClick={onClickTitle} aria-label="edit">
                  <EditIcon color="secondary" />
                </IconButton>
                <IconButton onClick={openModal} aria-label="add">
                  <AddIcon color="secondary" />
                </IconButton>
                <IconButton onClick={changeOnOpen} aria-label="delete">
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Box>
            </TitleWrapper>
          )}
        </Box>
        <TasksWrapper>
          {tasks.map(({ title, id, userId }: ITask) => (
            <Task
              key={id}
              title={title}
              author={userId}
              id={id}
              columnId={columnId}
              updateTask={(tasks: ITask[]) => setTasks(tasks)}
            />
          ))}
        </TasksWrapper>
      </ColumnWrapper>
      <ConfirmationModal
        flag={isOpen}
        cbClose={changeOnClose}
        cbOpen={changeOnOpen}
        cbHandler={removeColumn}
        body="Do you really want to remove this column?"
        title="Remove Column"
      />
    </>
  );
};
