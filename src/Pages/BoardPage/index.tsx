import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BoardWrapper, TitleBox, Title } from './indexStyles';
import { setIsCreateNewColumn } from '../../store/reducers/columnSlice';
import { Column } from '../../Components/Column';
import { RootState } from '../../store/store';

const BoardPage = () => {
  const { isCreateNewColumn } = useSelector((state: RootState) => state.columnSlice);
  const dispatch = useDispatch();

  const newColumnHandler = () => {
    dispatch(setIsCreateNewColumn(true));
  };

  return (
    <BoardWrapper>
      <TitleBox component="div">
        <IconButton sx={{ position: 'absolute', left: '3%', top: '11%' }}>
          <ArrowBackIcon fontSize="large" color="primary" />
        </IconButton>
        <Title variant="h4">My new board</Title>
        <Button variant="outlined" onClick={newColumnHandler}>
          New column
        </Button>
      </TitleBox>
      {isCreateNewColumn && <Column />}
    </BoardWrapper>
  );
};

export default BoardPage;
