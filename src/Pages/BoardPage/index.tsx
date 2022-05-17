import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BoardWrapper, TitleBox, Title, ColumnWrapper } from './styles';
import { setIsModalNewColumn } from '../../store/reducers/columnSlice';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import CreateNewBoard from '../../Components/CreateNewBoard';
import { Column } from '../../Components/Column';
import { getColumns, addNewColumn } from '../../utils/api/columns';
import { useAppDispatch } from '../../store/redux/redux';
import { IFetchColumn } from './types';
import { IColumn } from '../../store/initialState';

const BoardPage = () => {
  const { isModalNewColumn, columns } = useSelector((state: RootState) => state.columnSlice);
  const { selectedBoardTitle, selectedBoardId } = useSelector(
    (state: RootState) => state.boardSlice
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getColumns(selectedBoardId));
  }, []);

  const newColumnHandler = () => {
    dispatch(setIsModalNewColumn(true));
  };

  const createColumn = (data: IFetchColumn) => {
    const addColumnData = {
      boardId: selectedBoardId,
      columnData: { title: data.title, order: 2 },
    };

    dispatch(addNewColumn(addColumnData));
    dispatch(setIsModalNewColumn(false));
  };

  return (
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
        {columns.map((item: IColumn) => {
          return <Column key={item.id} title={item.title} id={item.id} order={item.order} />;
        })}
      </ColumnWrapper>
    </BoardWrapper>
  );
};

export default BoardPage;
