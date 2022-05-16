import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/redux/redux';
import { authSlice } from './../../store/reducers/authSlice';

const SimpleSnackbar = () => {
  const { isSnackbar } = useAppSelector((state) => state.authSlice);
  const { setSnackBar } = authSlice.actions;
  const dispatch = useAppDispatch();
  const vertical = 'top';
  const horizontal = 'center';

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setSnackBar(false));
  };

  return (
    <Snackbar
      open={isSnackbar}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Проверьте корректность логина или пароля
      </Alert>
    </Snackbar>
  );
};

export default SimpleSnackbar;
