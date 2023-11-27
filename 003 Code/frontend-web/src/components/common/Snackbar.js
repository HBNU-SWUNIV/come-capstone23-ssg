import React from 'react';
import { Snackbar as MuiSnackbar, Alert as MuiAlert } from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbar = ({
    message,
    success,
    open,
    handleClose
}) => {
    return (
        <MuiSnackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={success ? "success" : "error"}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </MuiSnackbar>
    )
}

export default Snackbar;