import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BoardCard from '../../Components/BoardCard';
import CreateNewBoard from '../../Components/CreateNewBoard';
import { RootState } from '../../store/store';
import { getBoards } from '../../utils/api/boards';
import { IFetchBoard } from './types';
import { iconArray } from '../../constants';
import { addNewBoard } from '../../utils/api/boards';
import { setIsModalNewBoard } from '../../store/reducers/boardSlice';
import { useAppDispatch } from '../../store/redux/redux';

const MainPage = () => {
  const { boards, isModalNewBoard } = useSelector((state: RootState) => state.boardSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('boards');
    dispatch(getBoards());
  }, []);

  const createBoard = async (data: IFetchBoard) => {
    await dispatch(addNewBoard(data.title));
    dispatch(setIsModalNewBoard(false));
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
            {isModalNewBoard && <CreateNewBoard titleName={'board'} submitFunc={createBoard} />}
          </>
        </Box>
      </Box>
    </Container>
  );
};

export default MainPage;
