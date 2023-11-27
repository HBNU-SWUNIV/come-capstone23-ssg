import React from 'react';
import { Snackbar as ReactNativePaperSnackbar, useTheme } from 'react-native-paper';

function Snackbar({
    visible,
    onDismiss,
    errorMessage,
    success
}) {
    const theme = useTheme();

    return (
        <ReactNativePaperSnackbar
            style={{
                backgroundColor: success ? theme.colors.info : theme.colors.error
            }}
            wrapperStyle={{ top: 0 }}
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