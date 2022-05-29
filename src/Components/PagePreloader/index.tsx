import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const PagePreloader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 102px)',
      }}
    >
      <CircularProgress size="10rem" />
    </Box>
  );
};
export default PagePreloader;
