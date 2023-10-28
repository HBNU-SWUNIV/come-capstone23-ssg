import React from 'react';
import { View } from 'react-native';
import {
    TextInput,
    HelperText,
    useTheme
} from 'react-native-paper';

function OutlineTextInput({
    style,
    error,
    label,
    helperText,
    disabled,
    value,
    onChangeText
}) {
    const theme = useTheme();

    return (
        <>
            {error ? (
                <View style={style}>
                    <TextInput
                        label={label}
                        mode='outlined'
                        activeOutlineColor={theme.colors.error}
                        disabled={disabled}
                        value={value}
                        onChangeText={onChangeText}
                    />
                    <HelperText type='error' visible={error}>
                        {helperText}
                    </HelperText>
                </View>
            ) : (
                <TextInput
                    style={style}
                    label={label}
                    mode='outlined'
                    activeOutlineColor={theme.colors.info}
                    disabled={disabled}
                    value={value}
                    onChangeText={onChangeText}
                />
            )}
        </>
    );
}

export default OutlineTextInput;