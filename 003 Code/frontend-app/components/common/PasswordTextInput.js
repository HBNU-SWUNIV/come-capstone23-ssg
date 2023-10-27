import React, { useState } from 'react';
import { View } from 'react-native';
import {
    TextInput,
    HelperText,
    useTheme
} from 'react-native-paper';

function PasswordTextInput({
    style,
    error,
    label,
    helperText,
    disabled,
    value,
    onChangeText
}) {
    const [isShow, setIsShow] = useState();

    const theme = useTheme();

    const onPress = () => {
        setIsShow(!isShow);
    };

    return (
        <>
            {error ? (
                <View style={style}>
                    <TextInput
                        label={label}
                        mode='outlined'
                        secureTextEntry={!isShow}
                        right={
                            <TextInput.Icon
                                icon={isShow ? 'eye-off' : 'eye'}
                                color={theme.colors.secondary}
                                disabled={disabled}
                                onPress={onPress}
                            />
                        }
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
                    secureTextEntry={!isShow}
                    right={
                        <TextInput.Icon
                            icon={isShow ? 'eye-off' : 'eye'}
                            color={theme.colors.secondary}
                            disabled={disabled}
                            onPress={onPress}
                        />
                    }
                    activeOutlineColor={theme.colors.info}
                    disabled={disabled}
                    value={value}
                    onChangeText={onChangeText}
                />
            )}
        </>
        
    );
}

export default PasswordTextInput;