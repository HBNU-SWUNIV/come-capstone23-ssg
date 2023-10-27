import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Text,
    Button,
    useTheme
} from 'react-native-paper';

function TextWithButton({
    name,
    buttonText,
    disabled,
    onPress
}) {
    const theme = useTheme();

    return (
        <View style={_styles.block}>
            <Text variant='bodyLarge'>{name}</Text>
            <Button
                style={_styles.button}
                mode='contained'
                buttonColor={theme.colors.info}
                disabled={disabled}
                onPress={onPress}
            >
                {buttonText}
            </Button>
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 8
    },
    button: {
        borderRadius: 5
    }
});

export default TextWithButton;