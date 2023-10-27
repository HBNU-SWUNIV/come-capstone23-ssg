import React from 'react';
import {
    KeyboardAvoidingView,
    View,
    StyleSheet
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import OutlineTextInput from '../common/OutlineTextInput';
import PasswordTextInput from '../common/PasswordTextInput';
import GreyButton from '../common/GreyButton';
import Icon from 'react-native-vector-icons/Ionicons';

function SignUp({
    name,
    id,
    password,
    passwordCheck,
    onNameChange,
    onIdChange,
    onPasswordChange,
    onPasswordCheckChange,
    onSignUp,
    goBack
}) {
    return (
        <KeyboardAvoidingView style={styles.block}>
            <OutlineTextInput
                style={styles.textInput}
                label='이름'
                value={name}
                onChangeText={onNameChange}
            />
            <OutlineTextInput
                label='아이디'
                value={id}
                onChangeText={onIdChange}
            />
            <View style={[styles.textWithIcon, styles.idTextWithIcon]}>
                <Icon
                    style={styles.icon}
                    name='warning-outline'
                    size={15}
                />
                <Text style={styles.text} variant='labelMedium'>
                    6~12자 영문, 숫자로 입력해주세요.
                </Text>
            </View>
            <PasswordTextInput
                style={styles.textInput}
                label='비밀번호'
                value={password}
                onChangeText={onPasswordChange}
            />
            <PasswordTextInput
                error={password != passwordCheck}
                label='비밀번호 확인'
                disabled={password === ''}
                value={passwordCheck}
                onChangeText={onPasswordCheckChange}
            />
            <View style={[styles.textWithIcon, styles.passwordTextWithIcon]}>
                <Icon
                    style={styles.icon}
                    name='warning-outline'
                    size={15}
                />
                <Text style={styles.text} variant='labelMedium'>
                    비밀번호는 영문 대소문자, 숫자, 특수문자(!@#$%)를 통합하여 8~20자로 입력해주세요.
                </Text>
            </View>
            <Button
                style={styles.signupButton}
                mode='contained'
                disabled={name === '' || id === '' || password === '' || password != passwordCheck}
                onPress={onSignUp}
            >
                회원가입 완료
            </Button>
            <GreyButton onPress={goBack}>취소</GreyButton>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    block: {
        marginRight: 50,
        marginLeft: 50
    },
    textInput: {
        marginBottom: 15
    },
    textWithIcon: {
        flexDirection: 'row',
        marginTop: 10
    },
    idTextWithIcon: {
        marginBottom: 30
    },
    passwordTextWithIcon: {
        marginBottom: 40
    },
    icon: {
        color: '#ff5722',
        fontWeight: 'bold'
    },
    text: {
        color: '#000000',
        position: 'relative',
        top: 0,
        bottom: 0,
        marginLeft: 5
    },
    signupButton: {
        marginBottom: 10,
        borderRadius: 5
    }
});

export default SignUp;