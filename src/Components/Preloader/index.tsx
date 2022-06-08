import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Preloader = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
      <CircularProgress size="2.8rem" />
    </Box>
  );
};
export default Preloader;
