import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import Picker from './Picker';

function TextWithPeriodPicker({
    name,
    index,
    workTime,
    periodNumbers,
    disabled,
    onChange
}) {
    return (
        <View style={_styles.block}>
            <View style={_styles.body}>
                <Picker
                    style={_styles.picker}
                    selectedIndex={index}
                    options={periodNumbers}
                    disabled={disabled}
                    onChange={onChange}
                />
                <Text variant='bodyLarge'>시간 마다 {workTime}초 동안 {name}</Text>
            </View>
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picker: {
        marginRight: 5
    }
});

export default TextWithPeriodPicker;