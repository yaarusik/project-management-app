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
        <Typography
          align="center"
          variant="h2"
          component="h1"
          mb={5}
          mt={5}
          fontWeight="500"
          sx={{
            fontSize: { xs: '2rem', sm: '2rem', md: '2rem', lg: '3rem' },
          }}
        >
          {t('welcome.title')}
        </Typography>
        <Container maxWidth="md">
          <Typography
            align="center"
            variant="h5"
            component="h2"
            mb={5}
            mt={5}
            fontWeight="400"
            sx={{
              fontSize: { xs: '1.2rem', sm: '1.2rem', md: '1.5rem', lg: '1.5rem' },
              mb: { xs: 4, sm: 4, md: 6, lg: 6 },
            }}
          >
            {t('welcome.part1')}
          </Typography>

          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' } }}
          >
            <Grid item xs={4} sx={{ order: { xs: -1, sm: -1, md: -1, lg: -1 } }}>
              <img src={TasksIcon} alt="task-icon" max-height="280px" width="100%" />
            </Grid>
            <Grid item xs={8} sx={{ order: { xs: 0, sm: 0, md: 0, lg: 0 } }}>
              <Typography
                variant="body1"
                paragraph={true}
                lineHeight={1.5}
                letterSpacing={0.8}
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.5rem', lg: '1.5rem' },
                  mt: { xs: 1, sm: 1, md: 2, lg: 3 },
                  mb: { xs: 5, sm: 5, md: 0, lg: 0 },
                }}
              >
                {t('welcome.part2')}
              </Typography>
            </Grid>
            <Grid item xs={8} sx={{ order: { xs: 1, sm: 1, md: 0, lg: 0 } }}>
              <Typography
                variant="body1"
                paragraph={true}
                lineHeight={1.5}
                letterSpacing={0.8}
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.5rem', lg: '1.5rem' },
                  order: { xs: 0, sm: 0, md: 0, lg: 0 },
                }}
              >
                {t('welcome.part3')}
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ order: { xs: 2, sm: 2, md: 0, lg: 0 } }}>
              <img src={ParallelTasksIcon} alt="task-icon" width="100%" max-height="280px" />
            </Grid>
            <Grid item xs={4} sx={{ order: { xs: 0, sm: 0, md: 0, lg: 0 } }}>
              <img src={TasksStatusIcon} alt="task-icon" width="100%" max-height="280px" />
            </Grid>
            <Grid item xs={8} sx={{ order: { xs: 0, sm: 0, md: 0, lg: 0 } }}>
              <Typography
                variant="body1"
                paragraph={true}
                lineHeight={1.5}
                letterSpacing={0.8}
                sx={{
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.5rem', lg: '1.5rem' },
                  mt: { xs: 1, sm: 1, md: 2, lg: 3 },
                  mb: { xs: 5, sm: 5, md: 0, lg: 0 },
                }}
              >
                {t('welcome.part4')}
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Typography
            align="center"
            variant="h3"
            component="h3"
            mb={3}
            mt={6}
            sx={{
              fontSize: { xs: '2rem', sm: '2rem', md: '3rem', lg: '3rem' },
            }}
          >
            {t('welcome.team')}
          </Typography>
          <Stack
            spacing={2}
            alignItems="center"
            justifyContent="space-around"
            mb={4}
            sx={{
              flexDirection: { xs: 'column', sm: 'row', md: 'row', lg: 'row' },
              justifyContent: {
                xs: 'space-between',
                sm: 'space-between',
                md: 'space-evenly',
                lg: 'space-evenly',
              },
              alignItems: { xs: 'center', sm: 'center', md: 'center', lg: 'center' },
            }}
          >
            <Avatar alt="Elena Shustova" sx={{ bgcolor: lightBlue[600] }}>
              {t('welcome.es')}
            </Avatar>
            <Typography
              fontSize="1.5rem"
              sx={{
                fontSize: { xs: '1.3rem', sm: '1.3rem', md: '1.5rem', lg: '1.5rem' },
              }}
            >
              {t('welcome.elena')}
            </Typography>
            <Avatar alt="Ruslan Vildanov" sx={{ bgcolor: lightBlue[600] }}>
              {t('welcome.rv')}
            </Avatar>
            <Typography
              fontSize="1.5rem"
              sx={{
                fontSize: { xs: '1.3rem', sm: '1.3rem', md: '1.5rem', lg: '1.5rem' },
              }}
            >
              {t('welcome.ruslan')}
            </Typography>
            <Avatar alt="Evgeniy Zhukov" sx={{ bgcolor: lightBlue[600] }}>
              {t('welcome.ez')}
            </Avatar>
            <Typography
              fontSize="1.5rem"
              sx={{
                fontSize: { xs: '1.3rem', sm: '1.3rem', md: '1.5rem', lg: '1.5rem' },
              }}
            >
              {t('welcome.evgeniy')}
            </Typography>
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
