import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    Platform,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import OutlineTextInput from '../common/OutlineTextInput';
import PasswordTextInput from '../common/PasswordTextInput';
import GreyButton from '../common/GreyButton';

function LogIn({
    id,
    password,
    onIdChange,
    onPasswordChange,
    onLogIn,
    goVerify,
    goSearchId,
    goSearchPassword
}) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding' })}
        >
            <SafeAreaView style={styles.block}>
                <OutlineTextInput
                    style={styles.textInput}
                    label='아이디'
                    value={id}
                    onChangeText={onIdChange}
                />
                <PasswordTextInput
                    style={styles.passwordTextInput}
                    label='비밀번호'
                    value={password}
                    onChangeText={onPasswordChange}
                />
                <Button
                    style={styles.loginButton}
                    mode='contained'
                    disabled={id === '' || password === ''}
                    onPress={onLogIn}
                >
                    로그인
                </Button>
                <GreyButton onPress={goVerify}>회원가입</GreyButton>
                <View style={styles.buttons}>
                    <Button textColor='black' onPress={goSearchId}>아이디 찾기</Button>
                    <Button textColor='black' onPress={goSearchPassword}>비밀번호 찾기</Button>
                </View>
            </SafeAreaView>
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
        marginBottom: 15
    },
    passwordTextInput: {
        marginBottom: 40
    },
    loginButton: {
        marginBottom: 10,
        borderRadius: 5
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default LogIn;