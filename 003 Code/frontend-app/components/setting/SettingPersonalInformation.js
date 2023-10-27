import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    View,
    StyleSheet
} from 'react-native';
import {
    Button,
    Portal,
    Dialog,
    Text,
    useTheme
} from 'react-native-paper';
import OutlineTextInput from '../common/OutlineTextInput';
import GreyButton from '../common/GreyButton';
import PasswordTextInput from '../common/PasswordTextInput';

function SettingPersonalInformation({
    name,
    phoneNumber,
    password,
    withdrawSuccess,
    visible,
    onNameChange,
    onPhoneNumberChange,
    onPasswordChange,
    onModify,
    onOpen,
    onClose,
    onOkay,
    goBack
}) {
    var phoneNumberPattern = /01[016789]-[^0][0-9]{2,3}-[0-9]{4}/;

    const theme = useTheme();

    return (
        <>
            <KeyboardAvoidingView
                style={styles.block}
                behavior={Platform.select({ ios: 'padding' })}
            >
                <OutlineTextInput
                    style={styles.textInput}
                    label='이름'
                    value={name}
                    onChangeText={onNameChange}
                />
                <OutlineTextInput
                    style={styles.phoneNumberTextInput}
                    error={phoneNumber !== '' && !phoneNumberPattern.test(phoneNumber)}
                    label='휴대전화번호'
                    helperText="XXX-XXXX-XXXX(XXX-XXX-XXXX) 형식으로 입력해주세요"
                    value={phoneNumber}
                    onChangeText={onPhoneNumberChange}
                />
                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={onModify}
                >
                    개인정보 수정
                </Button>
                <GreyButton style={styles.button} onPress={onOpen}>회원 탈퇴</GreyButton>
                <GreyButton onPress={goBack}>취소</GreyButton>
            </KeyboardAvoidingView>
            <Portal>
                <Dialog
                    style={styles.dialog}
                    visible={visible}
                    onDismiss={onClose}
                >
                    <Dialog.Content>
                        <Text style={styles.text} variant='bodyMedium'>
                            회원 탈퇴 시 개인정보와 작성한 스마트팜 및 작물 관련 데이터가 전부 삭제됩니다.
                            그래도 탈퇴하신다면, 아래 비밀번호를 입력 후 예 버튼을 클릭해주세요.
                        </Text>
                        <PasswordTextInput
                            style={styles.passwordTextInput}
                            error={!withdrawSuccess && withdrawSuccess !== null}
                            label='비밀번호'
                            helperText='비밀번호를 잘못 입력하셨습니다.'
                            value={password}
                            onChangeText={onPasswordChange}
                        />
                        <View style={styles.buttons}>
                            <Button onPress={onClose} textColor={theme.colors.error}>아니요</Button>
                            <Button
                                disabled={password === ''}
                                onPress={onOkay}
                                textColor={theme.colors.info}
                            >
                                예
                            </Button>
                        </View>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </>
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
    phoneNumberTextInput: {
        marginBottom: 40
    },
    button: {
        marginBottom: 10,
        borderRadius: 5
    },
    dialog: {
        backgroundColor: '#ffffff',
        borderRadius: 8
    },
    text: {
        marginBottom: 20
    },
    passwordTextInput: {
        marginBottom: 25
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 0
    }
});

export default SettingPersonalInformation;