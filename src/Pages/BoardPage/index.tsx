import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BoardWrapper, TitleBox, Title } from './indexStyles';
import { setIsModalNewColumn } from '../../store/reducers/columnSlice';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import CreateNewBoard from '../../Components/CreateNewBoard';
import { Column } from '../../Components/Column';

const BoardPage = () => {
  const { isModalNewColumn } = useSelector((state: RootState) => state.columnSlice);
  const { selectedBoardTitle } = useSelector((state: RootState) => state.boardSlice);
  const dispatch = useDispatch();

  const newColumnHandler = () => {
    dispatch(setIsModalNewColumn(true));
  };

  const createColumn = () => {
    // TODO: запрос к бэку на создание колонки
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
      <Column />
    </BoardWrapper>
  );
};

export default BoardPage;
