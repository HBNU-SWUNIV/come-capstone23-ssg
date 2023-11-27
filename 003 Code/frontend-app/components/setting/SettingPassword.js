import React from 'react';
import {
    KeyboardAvoidingView,
    View,
    StyleSheet
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import PasswordTextInput from '../common/PasswordTextInput';
import GreyButton from '../common/GreyButton';
import Icon from 'react-native-vector-icons/Ionicons';

function SettingPassword({
    password,
    passwordCheck,
    onPasswordChange,
    onPasswordCheckChange,
    onModify,
    goBack
}) {
    return (
        <KeyboardAvoidingView style={styles.block}>
            <PasswordTextInput
                style={styles.textInput}
                label='비밀번호'
                value={password}
                onChangeText={onPasswordChange}
            />
            <PasswordTextInput
                error={password != passwordCheck}
                label='비밀번호 확인'
                value={passwordCheck}
                onChangeText={onPasswordCheckChange}
            />
            <View style={styles.textWithIcon}>
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
                style={styles.button}
                mode='contained'
                disabled={password === '' || password !== passwordCheck}
                onPress={onModify}
            >
                다음
            </Button>
            <GreyButton onPress={goBack}>취소</GreyButton>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    block: {
        marginTop: 50,
        marginRight: 50,
        marginLeft: 50
    },
    textInput: {
        marginBottom: 15
    },
    textWithIcon: {
        flexDirection: 'row',
        marginTop: 10,
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
    button: {
        marginBottom: 10,
        borderRadius: 5
    }
});

export default SettingPassword;