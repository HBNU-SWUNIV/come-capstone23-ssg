import React from 'react';
import {
    Pressable,
    View,
    StyleSheet
} from 'react-native';
import {
    Text,
    Portal,
    Dialog,
    Button,
    useTheme
} from 'react-native-paper';

function AlarmItem({
    alarm,
    visible,
    onOpen,
    onClose,
    onOkay
}) {
    const theme = useTheme();

    return (
        <>
            <Pressable
                style={({pressed}) => [
                    {backgroundColor: pressed ? '#f5f5f5' : '#ffffff'}
                    ,_styles.block
                ]}
                onLongPress={onOpen}
            >
                <Text style={_styles.text} variant='bodyLarge'>{alarm.body}</Text>
                <Text style={_styles.time} variant='labelLarge'>{alarm.time}</Text>
            </Pressable>
            <Portal>
                <Dialog
                    style={_styles.dialog}
                    visible={visible}
                    onDismiss={onClose}
                >
                    <Dialog.Content>
                        <Text variant='bodyMedium'>
                            해당 알람을 삭제하시겠습니까?
                        </Text>
                        <View style={_styles.buttons}>
                            <Button onPress={onClose} textColor={theme.colors.error}>취소</Button>
                            <Button onPress={onOkay} textColor={theme.colors.info}>확인</Button>
                        </View>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </>
    );
}

const _styles = StyleSheet.create({
    block: {
        flex: 1,
        marginTop: 8,
        marginBottom: 8,
        padding: 16,
        borderRadius: 5
    },
    text: {
        textAlign: 'left'
    },
    time: {
        textAlign: 'right',
        marginTop: 24
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

export default AlarmItem;