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

import { changeTask, getTasks } from '../../utils/api/tasks';
import ConfirmationModal from '../ConfirmationModal';
import { deleteColumn, getColumnById, getColumns, updateColumn } from '../../utils/api/columns';
import { ITaskProps } from '../Task/types';
import { sortTask } from '../../utils/sort/task';
import Preloader from '../Preloader';
import { useTranslation } from 'react-i18next';

export const Column = ({ title, id, order }: IColumn) => {
  const { t } = useTranslation();
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { columns } = useAppSelector((state) => state.columnSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const [isPreloader, setIsPreloader] = useState(true);
  // заглушка
  const columnId = id;

  const [isChangeTitle, setIsChangeTitle] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [hoverOrder, setHoverOrder] = useState(1);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<IColumn, void, { handlerId: Identifier | null }>({
    accept: [dndTypes.COLUMN, dndTypes.TASK],
    hover(item: IColumn) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.order;
      const hoverIndex = order;

      setHoverOrder(dragIndex);

      item.order = hoverIndex as number;
    },
    drop(item: IColumn | ITaskProps, monitor) {
      if (!monitor.getDropResult()) {
        const dragId = (item as ITaskProps).columnId;
        dispatch(getColumnById({ selectedBoardId, columnId, token }))
          .then(async (res) => {
            const data = await res;
            return data.payload.tasks;
          })
          .then((result) => {
            if (result.length === 0) {
              const updateTaskOptions = {
                url: {
                  boardId: selectedBoardId,
                  columnId: dragId,
                  taskId: item.id,
                },
                body: {
                  title: item.title,
                  order: 1,
                  description: (item as ITaskProps).description,
                  userId: (item as ITaskProps).userId,
                  boardId: selectedBoardId,
                  columnId: columnId,
                },
                token: token,
              };
              const newTaskOptions = {
                url: {
                  boardId: selectedBoardId,
                  columnId: dragId,
                },
                token,
              };

              dispatch(changeTask(updateTaskOptions))
                .then(async () => {
                  const { payload } = await dispatch(getTasks(newTaskOptions));
                  (item as ITaskProps).updateTasks(
                    payload.sort((a: ITask, b: ITask) => a.order - b.order)
                  );
                })
                .then(() => {
                  dispatch(getColumns({ selectedBoardId, token }));
                });
            }
          });
      }
      if (monitor.getItemType() === dndTypes.COLUMN) {
        const columnData = {
          boardId: selectedBoardId,
          columnId: item.id,
          columnData: { title: item.title, order: hoverOrder },
          token: token,
        };
        dispatch(updateColumn(columnData)).then(() =>
          dispatch(getColumns({ selectedBoardId, token }))
        );
      }
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
          setTasks(sortTask(payload));
          setIsPreloader(false);
        }
      };
      fetchTasks();
    }
  }, [columns]);

  const setFlagChangeTitle = (param: boolean) => {
    setIsChangeTitle(param);
  };

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);
  const addTask = (task: ITask) => setTasks((prev) => [...prev, task]);
  const updateTasks = (tasks: ITask[]) => setTasks(tasks);

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
          {isPreloader ? (
            <Preloader />
          ) : (
            <>
              {tasks.map((task: ITask) => (
                <Task key={task.id} {...task} columnId={columnId} updateTasks={updateTasks} />
              ))}
            </>
          )}
        </TasksWrapper>
      </ColumnWrapper>

      <ConfirmationModal
        flag={isOpen}
        cbClose={changeOnClose}
        cbOpen={changeOnOpen}
        cbHandler={removeColumn}
        body={t('confirm.column.body')}
        title={t('confirm.column.title')}
      />
    </>
  );
};
