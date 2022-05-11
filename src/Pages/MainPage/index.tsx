import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BoardCard from '../../Components/BoardCard';
import CreateNewBoard from '../../Components/CreateNewBoard';
import { RootState } from '../../store/store';

function MainPage() {
  const isCreateNewBoard = useSelector((state: RootState) => state.root.isCreateNewBoard);
  return (
    <Container maxWidth="xl">
      <Box
        component="div"
        sx={{
          width: '100%',
          height: 'calc(100vh - 100px)',
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
          {isCreateNewBoard && <CreateNewBoard />}
          <BoardCard imgSrc={'images/logo.png'} title={'Board-1'} description={'Here is Board-1'} />
          <BoardCard imgSrc={'images/logo.png'} title={'Board-1'} description={'Here is Board-1'} />
          <BoardCard imgSrc={'images/logo.png'} title={'Board-1'} description={'Here is Board-1'} />
          <BoardCard imgSrc={'images/logo.png'} title={'Board-1'} description={'Here is Board-1'} />
          <BoardCard imgSrc={'images/logo.png'} title={'Board-1'} description={'Here is Board-1'} />
        </Box>
      </Box>
    </Container>
  );
}

export default MainPage;
