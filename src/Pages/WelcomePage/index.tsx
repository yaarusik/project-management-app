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

import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { t } = useTranslation();
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
          {t('welcome.title')}
        </Typography>
        <Container maxWidth="md">
          <Typography align="center" variant="h5" component="h2" mb={5} mt={5} fontWeight="400">
            {t('welcome.part1')}
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
                {t('welcome.part2')}
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
                {t('welcome.part3')}
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
                {t('welcome.part4')}
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Typography align="center" variant="h3" component="h3" mb={3}>
            {t('welcome.team')}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" mb={4}>
            <Avatar alt="Elena Shustova" sx={{ bgcolor: lightBlue[600] }}>
              {t('welcome.es')}
            </Avatar>
            <Typography fontSize="1rem">{t('welcome.elena')}</Typography>
            <Avatar alt="Ruslan Vildanov" sx={{ bgcolor: lightBlue[600] }}>
              {t('welcome.rv')}
            </Avatar>
            <Typography fontSize="1rem">{t('welcome.ruslan')}</Typography>
            <Avatar alt="Evgeniy Zhukov" sx={{ bgcolor: lightBlue[600] }}>
              {t('welcome.ez')}
            </Avatar>
            <Typography fontSize="1rem">{t('welcome.evgeniy')}</Typography>
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
            {t('welcome.rss')}
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
