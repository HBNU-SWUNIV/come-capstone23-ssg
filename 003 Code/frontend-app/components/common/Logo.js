import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

function Logo() {
    const theme = useTheme();

    return (
        <Text style={[styles.text, { color: theme.colors.primary }]} variant='displayMedium'>
            Smart Farm
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default Logo;