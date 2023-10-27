import React from 'react';
import { View, StyleSheet } from 'react-native';
import { 
    Checkbox,
    Text,
    useTheme
} from 'react-native-paper';

function TextWithCheckbox({
    name,
    value,
    disabled,
    onPress
}) {
    const theme = useTheme();

    return (
        <View style={_styles.block}>
            <Text variant='bodyLarge'>{name}</Text>
            <Checkbox
                color={theme.colors.info}
                status={value ? 'checked' : 'unchecked'}
                disabled={disabled}
                onPress={onPress}
            />
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 8
    }
});

export default TextWithCheckbox;