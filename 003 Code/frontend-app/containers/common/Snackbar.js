import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unshowSnackbar } from '../../slices/common';
import SnackbarComponent from '../../components/common/Snackbar';

function Snackbar() {
    const visible = useSelector(state => state.common.showSnackbar);
    const errorMessage = useSelector(state => state.common.errorMessage);

    const dispatch = useDispatch();

    const onDismiss = () => {dispatch(unshowSnackbar())};

    return (
        <SnackbarComponent
            visible={visible}
            onDismiss={onDismiss}
            errorMessage={errorMessage}
        />
    );
}

export default React.memo(Snackbar);