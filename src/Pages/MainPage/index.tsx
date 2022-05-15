import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BoardCard from '../../Components/BoardCard';
import CreateNewBoard from '../../Components/CreateNewBoard';
import { RootState, AppDispatch } from '../../store/store';
import { getBoards } from '../../Components/Api';
import { IFetchBoard } from './indexTypes';
import { iconArray } from '../../constants';

export const useAppDispatch = () => useDispatch<AppDispatch>();

function MainPage() {
  const { title, boards, isCreateNewBoard } = useSelector((state: RootState) => state.boardSlice);
  const dispatch = useAppDispatch();

  // вот из-за этого почему-то постоянно запросы идут после авторизации
  useEffect(() => {
    dispatch(getBoards());
  }, [title, boards]);

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
            {isCreateNewBoard && <CreateNewBoard />}
          </>
        </Box>
      </Box>
    </Container>
  );
}

export default MainPage;
