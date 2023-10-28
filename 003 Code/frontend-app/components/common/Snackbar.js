import React from 'react';
import { Snackbar as ReactNativePaperSnackbar, useTheme } from 'react-native-paper';

function Snackbar({
    visible,
    onDismiss,
    errorMessage
}) {
    const theme = useTheme();

    return (
        <ReactNativePaperSnackbar
            style={{ backgroundColor: theme.colors.error }}
            duration={5000}
            visible={visible}
            onDismiss={onDismiss}
            onIconPress={onDismiss}
        >
            {errorMessage}
        </ReactNativePaperSnackbar>
    );
}

export default Snackbar;