import React from 'react';
import { View, StyleSheet } from 'react-native';
import { 
    Text,
    Switch,
    useTheme
} from 'react-native-paper';

function TextWithSwitch({
    name,
    value,
    onChange
}) {
    const theme = useTheme();

    return (
        <View style={_styles.block}>
            <Text variant='bodyLarge'>{name}</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 4,
        padding: 8
    }
});

export default TextWithSwitch;