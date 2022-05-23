import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';

import { ConfirmationModalType } from './types';
import { useLocation } from 'react-router-dom';

const ConfirmationModal = ({
  flag,
  cbClose,
  cbOpen,
  cbHandler,
  title = 'Modal Title',
  body = 'Modal Body',
  disagree = 'No',
  agree = 'Yes',
}: ConfirmationModalType) => {
  const location = useLocation();
  const isMainPage = location.pathname === '/mainPage';

  const agreeHandler = () => {
    cbHandler?.();
    cbClose?.();
  };

  return (
    <div>
      <Dialog
        open={flag}
        onClose={cbOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {isMainPage && (
            <Button
              onClick={cbClose}
              sx={{ bgcolor: red[500], color: '#fff', '&:hover': { bgcolor: red[800] } }}
            >
              {disagree}
            </Button>
          )}
          <Button
            onClick={agreeHandler}
            autoFocus
            sx={{ bgcolor: green[600], color: '#fff', '&:hover': { bgcolor: green[800] } }}
          >
            {agree}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationModal;
