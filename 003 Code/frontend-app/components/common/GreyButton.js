import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

function GreyButton({
    style,
    children,
    disabled,
    onPress
}) {
    const theme = useTheme();

    return (
        <Button
            style={[_styles.button, style]}
            mode='contained'
            buttonColor={theme.colors.secondary}
            disabled={disabled}
            onPress={onPress}
        >
            {children}
        </Button>
    );
}

const _styles = StyleSheet.create({
    button: {
        borderRadius: 5
    }
});

export default GreyButton;