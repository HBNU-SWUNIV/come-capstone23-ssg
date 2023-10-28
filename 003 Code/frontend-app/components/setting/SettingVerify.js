import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet
} from 'react-native';
import { Button } from 'react-native-paper';
import PasswordTextInput from '../common/PasswordTextInput';
import GreyButton from '../common/GreyButton';

function SettingVerify({
    password,
    onPasswordChange,
    goNext,
    goBack
}) {
    return (
        <KeyboardAvoidingView
            style={styles.block}
            behavior={Platform.select({ ios: 'padding' })}
        >
            <PasswordTextInput
                style={styles.textInput}
                label='비밀번호'
                value={password}
                onChangeText={onPasswordChange}
            />
            <Button
                style={styles.button}
                mode='contained'
                disabled={password === ''}
                onPress={goNext}
            >
                다음
            </Button>
            <GreyButton onPress={goBack}>취소</GreyButton>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    block: {
        marginTop: 45,
        marginRight: 50,
        marginLeft: 50
    },
    textInput: {
        marginBottom: 40
    },
    button: {
        marginBottom: 10,
        borderRadius: 5
    }
});

export default SettingVerify;