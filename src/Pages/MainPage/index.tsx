import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BoardCard from '../../Components/BoardCard';
import CreateNewBoard from '../../Components/CreateNewBoard';
import { RootState, AppDispatch } from '../../store/store';
import { getBoards } from '../../Components/Api/boards';
import { IFetchBoard } from './indexTypes';
import { iconArray } from '../../constants';
import { addNewBoard } from '../../Components/Api/boards';
import { setIsCreateNewBoard } from '../../store/reducers/boardSlice';

function MainPage() {
  const {
    currentBoardTitle: title,
    boards,
    isCreateNewBoard,
    isDeleteBoard,
  } = useSelector((state: RootState) => state.boardSlice);
  const dispatch = useDispatch<AppDispatch>();

  // вот из-за этого почему-то постоянно запросы идут после авторизации
  useEffect(() => {
    console.log('boards');
    dispatch(getBoards());
  }, [title, isDeleteBoard]);

  const createBoard = (data: IFetchBoard) => {
    dispatch(addNewBoard(data.title));
    dispatch(setIsCreateNewBoard(false));
  };

  return (
    <Container sx={{ maxWidth: 'xl', minHeight: 'calc(100vh - 100px)' }}>
      <Box
        component="div"
        sx={{
          width: '100%',
          padding: '20px',
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'rgba(2,129,237,0.5)',
            fontWeight: '500',
          }}
        >
          My projects
        </Typography>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'colomn',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          <>
            {boards.map((item: IFetchBoard, i: number) => {
              return (
                <BoardCard
                  imgSrc={iconArray[i % iconArray.length]}
                  title={item.title}
                  key={item.id}
                  id={item.id}
                />
              );
            })}
            {isCreateNewBoard && <CreateNewBoard titleName={'board'} submitFunc={createBoard} />}
          </>
        </Box>
      </Box>
    </Container>
  );
}

export default MainPage;
