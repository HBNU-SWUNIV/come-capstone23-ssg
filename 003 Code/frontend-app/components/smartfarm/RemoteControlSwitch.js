import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Text,
    Switch,
    useTheme
} from 'react-native-paper';

function RemoteControlSwitch({
    value,
    onChange
}) {
    const theme = useTheme();

    return (
        <View style={_styles.block}>
            <Text style={_styles.text} variant='bodyLarge'>원격 제어</Text>
            <Switch
                value={value}
                onChange={onChange}
                color={theme.colors.info}
            />
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 30
    },
    text: {
        marginRight: 5
    }
});

export default RemoteControlSwitch;