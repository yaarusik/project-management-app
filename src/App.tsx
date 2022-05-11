import AppRoutes from './Components/AppRoutes/AppRoutes';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { Box } from '@mui/material';
import styled from 'styled-components';

const AppBox = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

function App() {
  return (
    <AppBox>
      <Header />
      <AppRoutes />
      <Footer />
    </AppBox>
  );
}

export default App;
