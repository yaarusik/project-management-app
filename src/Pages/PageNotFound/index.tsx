import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function PageNotFound() {
  return (
    <Container maxWidth="xl">
      <Box
        component="div"
        sx={{
          backgroundImage: 'url(images/404.jpg)',
          width: '100%',
          height: '100vh',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      ></Box>
    </Container>
  );
}

export default PageNotFound;
