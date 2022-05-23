import { useEffect, useState } from 'react';

import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { ColumnWrapper, Title, TitleWrapper } from './styles';
import { TasksWrapper } from '../Task/style';

import { ITask } from '../../store/initialStates/types';

import InputTitleColumn from '../InputTitleColumn';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { setCurrentColumnId, setCurrentColumnOrder } from '../../store/reducers/columnSlice';
import { IColumn } from '../../store/initialState';

import TaskModal from './../TaskModal';
import Task from './../Task';

import { getTasks } from '../../utils/api/tasks';
import { deleteColumn, getColumns } from '../../utils/api/columns';

export const Column = ({ title, id, order }: IColumn) => {
  const { selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  // заглушка
  const columnId = id;

  const [isChangeTitle, setIsChangeTitle] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isModal, setIsModal] = useState(false);

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
      <ColumnWrapper>
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
          {tasks.map((task: ITask) => (
            <Task
              key={task.id}
              {...task}
              columnId={columnId}
              updateTask={(tasks: ITask[]) => setTasks(tasks)}
            />
          ))}
        </TasksWrapper>
      </ColumnWrapper>
    </>
  );
};
