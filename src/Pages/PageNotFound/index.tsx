import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function PageNotFound() {
  return (
    <Container sx={{ flex: '1 0 auto' }} maxWidth="xl">
      <Box
        component="div"
        sx={{
          backgroundImage: 'url(images/404.jpg)',
          width: '100%',
          height: '84.6vh',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'bottom',
        }}
      ></Box>
    </Container>
  );
}

export default PageNotFound;
