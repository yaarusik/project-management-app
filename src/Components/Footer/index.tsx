import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyrightIcon from '@mui/icons-material/Copyright';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <Box component="footer">
      <Container maxWidth="xl">
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
          <Button
            variant="outlined"
            href="https://rs.school/react/"
            rel="noreferrer"
            target="_blank"
          >
            <img
              src="https://rs.school/images/rs_school_js.svg"
              alt="logo"
              width={80}
              height={30}
            />
          </Button>

          <ButtonGroup size="large" aria-label="github button group">
            <Button
              startIcon={<GitHubIcon />}
              href="https://github.com/ShustovaElena"
              rel="noreferrer"
              target="_blank"
              variant="outlined"
            >
              Elena Shustova
            </Button>
            <Button
              startIcon={<GitHubIcon />}
              href="https://github.com/yaarusik"
              rel="noreferrer"
              target="_blank"
              variant="outlined"
            >
              Ruslan Vildanov
            </Button>
            <Button
              startIcon={<GitHubIcon />}
              href="https://github.com/nobodynoticed"
              rel="noreferrer"
              target="_blank"
              variant="outlined"
            >
              Evgeniy Zhukov
            </Button>
          </ButtonGroup>
          <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
            <Typography variant="body1">2022</Typography>
            <CopyrightIcon />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
