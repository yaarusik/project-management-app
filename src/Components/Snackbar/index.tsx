import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

const SimpleSnackbar = ({ errorMessage }: { errorMessage: string }) => {
  const [isSnackbar, setIsSnackbar] = useState(true);

  const vertical = 'bottom';
  const horizontal = 'center';

  const handleClose = (e: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackbar(false);
  };

  return (
    <Snackbar
      open={isSnackbar}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default SimpleSnackbar;
