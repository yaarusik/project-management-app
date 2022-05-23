import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { lightBlue } from '@mui/material/colors';
import Button from '@mui/material/Button';

import ParallelTasksIcon from '../../assets/welcomePageIcons/parallel-tasks.svg';
import TasksIcon from '../../assets/welcomePageIcons/tasks.svg';
import TasksStatusIcon from '../../assets/welcomePageIcons/task-status.svg';

import ConfirmationModal from '../../Components/ConfirmationModal';
import { useState } from 'react';

const WelcomePage = () => {
  const [isOpen, setOpen] = useState(false);

  const changeOnOpen = () => {
    setOpen(true);
  };

  const changeOnClose = () => {
    setOpen(false);
  };

  return (
    <Box component="section" sx={{ minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography align="center" variant="h2" component="h1" mb={5} mt={5} fontWeight="500">
          Welcome!
        </Typography>
        <Button variant="outlined" onClick={changeOnOpen}>
          Open alert dialog
        </Button>
        <Container maxWidth="md">
          <Typography align="center" variant="h5" component="h2" mb={5} mt={5} fontWeight="400">
            Task Manager is an application that helps an individual or a group of developers to
            achieve their goals.
          </Typography>

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={4}>
              <img src={TasksIcon} alt="task-icon" height={'280px'} />
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                fontSize="1.5rem"
                paragraph={true}
                lineHeight={1.5}
                letterSpacing={0.8}
              >
                Our app helps you break down large tasks into smaller ones, thereby enabling you to
                successfully achieve your goals.
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                fontSize="1.5rem"
                paragraph={true}
                lineHeight={1.5}
                letterSpacing={0.8}
              >
                Team coordination. Allocate tasks within the team to each other thanks to the
                boards.
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <img src={ParallelTasksIcon} alt="task-icon" width="100%" height={'280px'} />
            </Grid>
            <Grid item xs={4}>
              <img src={TasksStatusIcon} alt="task-icon" width="100%" height={'280px'} />
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body1"
                fontSize="1.5rem"
                paragraph={true}
                lineHeight={1.5}
                letterSpacing={0.8}
                ml={5}
              >
                Keep track of what stage your project is at.
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Typography align="center" variant="h3" component="h3" mb={3}>
            Our team:
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mb={4}>
            <Avatar alt="Elena Shustova" sx={{ bgcolor: lightBlue[600] }}>
              ES
            </Avatar>
            <Typography fontSize="1.5rem">Elena Shustova</Typography>
            <Avatar alt="Ruslan Vildanov" sx={{ bgcolor: lightBlue[600] }}>
              RV
            </Avatar>
            <Typography fontSize="1.5rem">Ruslan Vildanov</Typography>
            <Avatar alt="Evgeniy Zhukov" sx={{ bgcolor: lightBlue[600] }}>
              EZ
            </Avatar>
            <Typography fontSize="1.5rem">Evgeniy Zhukov</Typography>
          </Stack>
          <Button
            variant="contained"
            sx={{
              bgcolor: lightBlue[600],
              display: 'block',
              textAlign: 'center',
              fontSize: '1.1rem',
              maxWidth: '230px',
              margin: '0 auto',
              marginBottom: '30px',
            }}
            href="https://rs.school/react/"
            target="_blank"
          >
            RSS REACT 2022 Q1
          </Button>
          <ConfirmationModal
            flag={isOpen}
            cbClose={changeOnClose}
            cbOpen={changeOnOpen}
            body="Confirmation body title"
            title="Confirmation modal title"
          />
        </Container>
      </Container>
    </Box>
  );
};

export default WelcomePage;
