import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

function SettingBox({ title, children }) {
    return (
        <View style={_styles.block}>
            <Text style={_styles.text} variant='titleLarge'>{title}</Text>
            {children}
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flex: 1,
        marginTop: 30,
        marginBottom: 30,
        marginRight: 20,
        marginLeft: 20
    },
    text: {
        fontWeight: 'bold',
        marginBottom: 16
    }
});

export default SettingBox;