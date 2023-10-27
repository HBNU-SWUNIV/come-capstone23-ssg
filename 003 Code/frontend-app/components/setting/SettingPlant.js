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

function SettingPlant({
    name,
    day,
    visible,
    onNameChange,
    onDayChange,
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
                <OutlineTextInput
                    style={styles.nameTextInput}
                    label='이름'
                    value={name}
                    onChangeText={onNameChange}
                />
                <View style={styles.dayBlock}>
                    <Text variant='bodySmall'>
                        작물을 키운 지
                    </Text>
                    <OutlineTextInput
                        style={styles.dayTextInput}
                        value={day}
                        onChangeText={onDayChange}
                    />
                    <Text variant='bodySmall'>
                        일 지났어요
                    </Text>
                </View>
                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={onModify}
                >
                    작물 수정
                </Button>
                <GreyButton style={styles.button} onPress={onOpen}>작물 삭제</GreyButton>
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
                            작물 삭제 시 해당 작물 정보를 확인할 수 없습니다.
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
    nameTextInput: {
        marginBottom: 15
    },
    dayBlock: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    dayTextInput: {
        marginRight: 8,
        marginLeft: 8
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

export default SettingPlant;