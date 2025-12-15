import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { SnackbarContext } from "./context/snackbarContext"
export default function MySnackbar() {
  const { open, setOpen, message, setMessage } = useContext(SnackbarContext);
  return (
    <div>

      <Snackbar open={open} autoHideDuration={6000}>
        <Alert
          // onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
