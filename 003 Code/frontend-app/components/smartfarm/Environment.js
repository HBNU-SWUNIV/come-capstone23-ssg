import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

function Environment({
    name,
    value
}) {
    return (
        <View style={_styles.block}>
            <Text variant='bodyLarge'>{name}</Text>
            <Text variant='bodyLarge'>{value}</Text>
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 8
    }
});

export default Environment;