import { useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BoardWrapper, TitleBox, Title, ColumnWrapper } from './styles';
import { setIsModalNewColumn } from '../../store/reducers/columnSlice';
import { Link } from 'react-router-dom';
import CreateNewBoard from '../../Components/CreateNewBoard';
import { Column } from '../../Components/Column';
import { getColumns, addNewColumn } from '../../utils/api/columns';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { IFetchColumn } from './types';
import { IColumn } from '../../store/initialState';
import TaskBar from './../../Components/TaskBar/index';

export const dndTypes = {
  COLUMN: 'column',
  TASK: 'task',
};

export interface Item {
  id: string;
  title: string;
  order: number;
}

const BoardPage = () => {
  const { isModalNewColumn, columns } = useAppSelector((state) => state.columnSlice);
  const { token } = useAppSelector((state) => state.authSlice);
  const { selectedBoardTitle, selectedBoardId } = useAppSelector((state) => state.boardSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      if (!selectedBoardId) {
        dispatch(getColumns({ selectedBoardId, token }));
      } else dispatch(getColumns({ selectedBoardId, token }));
    } else {
      // ошибку выбрасывать или не пускать на этот роут если не авторизован
    }
  }, []);

  const newColumnHandler = () => {
    dispatch(setIsModalNewColumn(true));
  };

  const createColumn = (data: IFetchColumn) => {
    if (token) {
      const addColumnData = {
        boardId: selectedBoardId,
        title: data.title,
        token: token,
      };

      dispatch(addNewColumn(addColumnData));
      dispatch(setIsModalNewColumn(false));
    }
  };

  return (
    <>
      <BoardWrapper>
        <TitleBox component="div">
          <IconButton
            sx={{ position: 'absolute', left: '3%', top: '11%' }}
            component={Link}
            to="/mainPage"
          >
            <ArrowBackIcon fontSize="large" color="primary" />
          </IconButton>
          <Title variant="h4">{selectedBoardTitle}</Title>
          <Button variant="outlined" onClick={newColumnHandler}>
            New column
          </Button>
        </TitleBox>
        {isModalNewColumn && <CreateNewBoard titleName={'column'} submitFunc={createColumn} />}
        <ColumnWrapper>
          {columns.map((item: IColumn) => (
            <Column key={item.id} title={item.title} id={item.id} order={item.order} />
          ))}
        </ColumnWrapper>
      </BoardWrapper>
      <TaskBar />
    </>
  );
};

export default BoardPage;
