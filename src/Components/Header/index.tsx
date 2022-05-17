import { useLocation } from 'react-router-dom';

import Button, { ButtonProps } from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { purple } from '@mui/material/colors';
import LangSwitcher from '../LangSwitcher';
import { Link } from 'react-router-dom';
import { setIsModalNewBoard } from '../../store/reducers/boardSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/redux/redux';

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

const Header = () => {
  const { isAuth } = useAppSelector((state) => state.authSlice);

  const location = useLocation();
  const isWelcomePage = location.pathname === '/';

  const dispatch = useDispatch();

  const createNewBoardHandler = () => {
    dispatch(setIsModalNewBoard(true));
  };

  return (
    <AppBar position="sticky">
      <Box component="header" sx={{ bgcolor: '#0281ed', height: '60px', paddingTop: '5px' }}>
        <CssBaseline />
        <Container maxWidth="xl">
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              <img src="images/logo.png" alt="logo" width={50} height={50} />
              <Typography
                component={Link}
                to="/mainPage"
                variant="h5"
                sx={{
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif;',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Task manager
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              {!isAuth && isWelcomePage && (
                <>
                  <Button component={Link} to="/login" color="success" variant="contained">
                    Log in
                  </Button>
                  <Button component={Link} to="/signup" color="success" variant="contained">
                    Sign up
                  </Button>
                </>
              )}

              {isAuth && isWelcomePage && (
                <>
                  <Button
                    component={Link}
                    to="/mainPage"
                    variant="contained"
                    sx={{
                      backgroundColor: purple[500],
                      '&:hover': { backgroundColor: purple[700] },
                    }}
                  >
                    Go to Main Page
                  </Button>
                  {/* <ColorButton onClick={createNewBoardHandler} variant="contained">
                    Create new board
                  </ColorButton> */}
                  <LangSwitcher />
                  <IconButton aria-label="edit-profile">
                    <PersonIcon />
                  </IconButton>
                  <IconButton aria-label="logout">
                    <LogoutIcon />
                  </IconButton>
                </>
              )}

              {isAuth && !isWelcomePage && (
                <>
                  <ColorButton onClick={createNewBoardHandler} variant="contained">
                    Create new board
                  </ColorButton>
                  <LangSwitcher />
                  <IconButton aria-label="edit-profile">
                    <PersonIcon />
                  </IconButton>
                  <IconButton aria-label="logout">
                    <LogoutIcon />
                  </IconButton>
                </>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </AppBar>
  );
};

export default Header;
