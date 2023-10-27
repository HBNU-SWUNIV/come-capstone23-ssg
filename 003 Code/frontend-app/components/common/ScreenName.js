import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

function ScreenName({children}) {
    return (
        <Text style={styles.text} variant='headlineSmall'>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000'
    }
});

export default ScreenName;