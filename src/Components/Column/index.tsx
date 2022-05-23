import { useEffect, useRef, useState } from 'react';
import { useDrag, DragSourceMonitor, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';

import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

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
import { deleteColumn, getColumns, updateColumn } from '../../utils/api/columns';

export const Column = ({ title, id, order }: IColumn) => {
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const [isChangeTitle, setIsChangeTitle] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isModal, setIsModal] = useState(false);

  // const [{ isDragging }, drag] = useDrag({
  //   type: dndTypes.COLUMN,
  //   item: () => {
  //     return { id, title, order };
  //   },
  //   collect: (monitor: DragSourceMonitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // });

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<IColumn, void, { handlerId: Identifier | null }>({
    accept: dndTypes.COLUMN,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    async hover(item: IColumn, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.order;
      const hoverIndex = order;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < (hoverIndex as number) && hoverClientX < hoverMiddleX) {
        return;
      }

      // Dragging upwards
      if (dragIndex > (hoverIndex as number) && hoverClientX > hoverMiddleX) {
        return;
      }

      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex as number);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.

      const updateColumnData = {
        title: title,
        order: dragIndex,
      };

      const columnData = {
        boardId: selectedBoardId,
        columnId: id,
        columnData: updateColumnData,
        token: token,
      };

      console.log(updateColumnData);
      await dispatch(updateColumn(columnData));
      dispatch(getColumns({ selectedBoardId, token }));

      item.order = hoverIndex as number;
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
      <ColumnWrapper ref={ref} style={{ opacity: opacity }} data-handler-id={handlerId}>
        <Box>
          {isChangeTitle ? (
            <InputTitleColumn setFlagChangeTitle={setFlagChangeTitle} />
          ) : (
            <TitleWrapper>
              <Title onClick={onClickTitle}>{title}</Title>
              <Box>
                <IconButton onClick={openModal} aria-label="add">
                  <AddIcon color="secondary" />
                </IconButton>
                <IconButton onClick={removeColumn} aria-label="delete">
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Box>
            </TitleWrapper>
          )}
        </Box>
        <TasksWrapper>
          {tasks.map(({ title, id, userId }: ITask) => (
            <Task key={id} title={title} author={userId} />
          ))}
        </TasksWrapper>
      </ColumnWrapper>
    </>
  );
};
