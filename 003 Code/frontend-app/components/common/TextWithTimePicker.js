import React, { useState } from 'react';
import {
    View,
    Keyboard,
    StyleSheet
} from 'react-native';
import {
    Portal,
    Modal,
    Text,
    TextInput,
    IconButton,
    Button,
    useTheme
} from 'react-native-paper';
import OutlineTextInput from './OutlineTextInput';
import Picker from './Picker';

function TextWithTimePicker({
    name,
    time,
    disabled,
    onDayNightChange,
    onHourChange,
    onMinuteChange
}) {
    const dayNight = ['AM', 'PM']

    const hours = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12'
    ];

    const minutes = [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
        '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
        '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
        '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
        '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
        '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
    ];

    const [visibleTimeModal, setVisibleTimeModal] = useState(false);
    const [keyboardInput, setKeyboardInput] = useState(false);

    const [dayNightSelectedIndex, setDayNightSelectedIndex] = useState(
        time.dayNight === 'AM' ? 0 : 1
    );
    const [hourSelectedIndex, setHourSelectedIndex] = useState(
        Number(time.hour) < 13 ? Number(time.hour) - 1 : Number(time.hour) - 13
    );
    const [minuteSelectedIndex, setMinutesSelectedIndex] = useState(Number(time.minute));

    const [tmpHour, setTmpHour] = useState(time.hour);
    const [tmpMinute, setTmpMinute] = useState(time.minute);

    const theme = useTheme();
    
    const onOpen = () => {
        Keyboard.dismiss();
        setVisibleTimeModal(true);
    };

    const onClose = () => {
        setDayNightSelectedIndex(time.dayNight === 'AM' ? 0 : 1);
        setHourSelectedIndex(Number(time.hour) < 13 ? Number(time.hour) - 1 : Number(time.hour) - 13);
        setMinutesSelectedIndex(Number(time.minute));
        setTmpHour(time.hour);
        setTmpMinute(time.minute);

        Keyboard.dismiss();
        setVisibleTimeModal(false);
    };

    const onOkay = () => {
        let dayNightIndex;
        let hourIndex;
        let minuteIndex;

        if (keyboardInput) {
            if (Number(tmpHour) < 1 || Number(tmpHour) > 24 || Number(tmpMinute) < 0 || Number(tmpMinute) > 59) {
                console.log('시간을 잘못 입력함');
                return;
            }

            if (Number(tmpHour) > 0 && Number(tmpHour) < 12) {
                dayNightIndex = 0;
            } else if (Number(tmpHour) < 25) {
                dayNightIndex = 1;
            }

            hourIndex = (Number(tmpHour) % 12) - 1;

            if(Number(tmpMinute) > -1 && Number(tmpMinute) < 60) {
                minuteIndex = Number(tmpMinute);
            }

            setDayNightSelectedIndex(dayNightIndex);
            setHourSelectedIndex(hourIndex);
            setMinutesSelectedIndex(minuteIndex);
        } else {
            if (dayNightSelectedIndex === 0) {
                setTmpHour(hours[hourSelectedIndex]);
            } else {
                setTmpHour(String(12 + Number(hours[hourSelectedIndex])));
            }
            setTmpMinute(minutes[minuteSelectedIndex]);
        }

        onDayNightChange(dayNight[keyboardInput ? dayNightIndex : dayNightSelectedIndex]);
        onHourChange(hours[keyboardInput ? hourIndex : hourSelectedIndex]);
        onMinuteChange(minutes[keyboardInput ? minuteIndex : minuteSelectedIndex]);

        Keyboard.dismiss();
        setVisibleTimeModal(false);
    };

    const onKeyboardInputChange = () => {
        setKeyboardInput(!keyboardInput);

        if (!keyboardInput) {
            if (dayNightSelectedIndex === 0) {
                setTmpHour(hours[hourSelectedIndex]);
            } else {
                setTmpHour(String(12 + Number(hours[hourSelectedIndex])));
            }
            setTmpMinute(minutes[minuteSelectedIndex]);
        }
    };

    const onDayNightSelectedIndexChange = (index) => {
        setDayNightSelectedIndex(index);
    };

    const onHourSelectedIndexChange = (index) => {
        setHourSelectedIndex(index);
    };

    const onMinuteSelectedIndexChange = (index) => {
        setMinutesSelectedIndex(index);
    };

    return (
        <View style={_styles.block}>
            <Text variant='bodyLarge'>{name}</Text>
            <TextInput
                mode='outlined'
                right={
                    <TextInput.Icon
                        icon='clock-outline'
                        color={theme.colors.secondary}
                        disabled={disabled}
                        onPress={onOpen}
                    />
                }
                value={`${time.dayNight} ${time.hour}:${time.minute}`}
                disabled={disabled}
                editable={false}
            />
            <Portal>
                <Modal
                    visible={visibleTimeModal}
                    onDismiss={onClose}
                    contentContainerStyle={_styles.timeModal}
                >
                    <View>
                        <View style={_styles.timeModalBody}>
                            {keyboardInput ? (
                                <>
                                    <OutlineTextInput
                                        style={_styles.textInput}
                                        label='시'
                                        value={tmpHour}
                                        onChangeText={setTmpHour}
                                    />
                                    <OutlineTextInput
                                        label='분'
                                        value={tmpMinute}
                                        onChangeText={setTmpMinute}
                                    />
                                </>
                            ) : (
                                <>
                                    <Picker
                                        style={_styles.wheelPicker}
                                        selectedIndex={dayNightSelectedIndex}
                                        options={dayNight}
                                        onChange={onDayNightSelectedIndexChange}
                                    />
                                    <Picker
                                        style={_styles.wheelPicker}
                                        selectedIndex={hourSelectedIndex}
                                        options={hours}
                                        onChange={onHourSelectedIndexChange}
                                    />
                                    <Picker
                                        selectedIndex={minuteSelectedIndex}
                                        options={minutes}
                                        onChange={onMinuteSelectedIndexChange}
                                    />
                                </>
                            )}
                        </View>
                        <View style={_styles.buttons}>
                            <IconButton
                                icon={keyboardInput ? 'keyboard-outline' : 'keyboard'}
                                iconColor='#000000'
                                onPress={onKeyboardInputChange}
                            />
                            <View style={_styles.rightButtons}>
                                <Button onPress={onClose} textColor={theme.colors.error}>취소</Button>
                                <Button onPress={onOkay} textColor={theme.colors.info}>확인</Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 8
    },
    timeModal: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 20
    },
    timeModalBody: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        marginRight: 10
    },
    wheelPicker: {
        marginRight: 3
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    rightButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 40
    }
});

export default TextWithTimePicker;