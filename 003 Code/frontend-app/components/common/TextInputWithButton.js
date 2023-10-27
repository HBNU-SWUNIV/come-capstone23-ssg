import React from 'react';
import { View, StyleSheet } from 'react-native';
import OutlineTextInput from './OutlineTextInput';
import GreyButton from './GreyButton';

function TextInputWithButton({
    style,
    textInputLabel,
    buttonChildren,
    textInputDisabled,
    value,
    onChangeText,
    buttonDisabled,
    onPress
}) {
    return (
        <View style={[_styles.block, style]}>
            <OutlineTextInput
                style={_styles.textInput}
                label={textInputLabel}
                disabled={textInputDisabled}
                value={value}
                onChangeText={onChangeText}
            />
            <GreyButton
                style={_styles.button}
                disabled={buttonDisabled}
                onPress={onPress}
            >
                {buttonChildren}
            </GreyButton>
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        flex: 1,
        marginRight: 10
    },
    button: {
        borderRadius: 5
    }
});

export default TextInputWithButton;