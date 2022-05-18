import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Preloader = () => {
  const { isAuth } = useSelector((state: RootState) => state.authSlice);
  // console.log(isAuth);

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size="3rem" />
    </Box>
  );
};
export default Preloader;
