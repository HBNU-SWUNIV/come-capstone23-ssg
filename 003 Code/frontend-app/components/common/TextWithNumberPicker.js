import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Picker from './Picker';

function TextWithNumberPicker({
    name,
    index,
    numbers,
    disabled,
    onChange
}) {
    return (
        <View style={_styles.block}>
            <Text variant='bodyLarge'>{name}</Text>
            <Picker
                selectedIndex={index}
                options={numbers}
                disabled={disabled}
                onChange={onChange}
            />
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

export default TextWithNumberPicker;