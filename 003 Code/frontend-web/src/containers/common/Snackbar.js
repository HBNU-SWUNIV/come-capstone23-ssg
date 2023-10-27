import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unshowSnackbar } from '../../modules/common';
import SnackbarComponent from '../../components/common/Snackbar';

const Snackbar = () => {
    const open = useSelector(state => state.common.showSnackbar);
    const errorMessage = useSelector(state => state.common.errorMessage);

    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(unshowSnackbar());
    };

    return (
        <SnackbarComponent
            message={errorMessage}
            open={open}
            handleClose={handleClose}
        />
    );
}

export default React.memo(Snackbar);