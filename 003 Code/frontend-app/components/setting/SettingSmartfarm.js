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
import TextInputWithButton from '../common/TextInputWithButton';
import GreyButton from '../common/GreyButton';

function SettingSmartfarm({
    smartfarmNumber,
    checkSmartfarmNumberSuccess,
    visible,
    onSmartfarmNumberChange,
    onCheckSmartfarmNumber,
    onModify,
    onOpen,
    onClose,
    onOkay,
    goBack
}) {
    const theme = useTheme();

    return (
        <>
            <KeyboardAvoidingView
                style={styles.block}
                behavior={Platform.select({ ios: 'padding' })}
            >
                <TextInputWithButton
                    style={styles.TextInputWithButton}
                    textInputLabel='스마트팜 고유번호'
                    buttonChildren='중복 확인'
                    value={smartfarmNumber}
                    onChangeText={onSmartfarmNumberChange}
                    buttonDisabled={smartfarmNumber === '' ? true : false}
                    onPress={onCheckSmartfarmNumber}
                />
                <Button
                    style={styles.button}
                    mode='contained'
                    disabled={!checkSmartfarmNumberSuccess}
                    onPress={onModify}
                >
                    스마트팜 수정
                </Button>
                <GreyButton style={styles.button} onPress={onOpen}>스마트팜 삭제</GreyButton>
                <GreyButton onPress={goBack}>취소</GreyButton>
            </KeyboardAvoidingView>
            <Portal>
                <Dialog
                    style={styles.dialog}
                    visible={visible}
                    onDismiss={onClose}
                >
                    <Dialog.Content>
                        <Text variant='bodyMedium'>
                            스마트팜 삭제 시 해당 스마트팜 정보 확인 및 제어를 할 수 없습니다.
                            그래도 삭제하신다면, 아래 예 버튼을 클릭해주세요.
                        </Text>
                        <View style={styles.buttons}>
                            <Button onPress={onClose} textColor={theme.colors.error}>아니요</Button>
                            <Button onPress={onOkay} textColor={theme.colors.info}>예</Button>
                        </View>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </>
    )
}

const styles = StyleSheet.create({
    block: {
        marginTop: 50,
        marginRight: 50,
        marginLeft: 50
    },
    TextInputWithButton: {
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 0,
        marginTop: 20
    }
});

export default SettingSmartfarm;