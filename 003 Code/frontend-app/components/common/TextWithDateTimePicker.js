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

function TextWithDateTimePicker({
    name,
    periodTime,
    disabled,
    onPeriodChange,
    onPeriodUnitChange,
    onTimeChange,
    onTimeUnitChange
}) {
    const periodNumbers = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29'
    ];
    const timeNumbers = [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
        '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
        '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
    ];
    const periodUnitNames = ['개월', '주', '일', '시간'];
    const periodUnitValues = [13, 4, 30, 24];
    const timeUnits = ['분', '초'];

    const [visiblePeriodModal, setVisiblePeriodModal] = useState(false);
    const [periodKeyboardInput, setPeriodKeyboardInput] = useState(false);
    const [periodSelectedIndex, setPeriodSelectedIndex] = useState(Number(periodTime.period) - 1);
    const [periodUnitSelectedIndex, setPeriodUnitSelectedIndex] = useState(periodUnitNames.indexOf(periodTime.periodUnit));
    const [tmpPeriod, setTmpPeriod] = useState(periodTime.period);

    const [visibleTimeModal, setvisibleTimeModal] = useState(false);
    const [timeKeyboardInput, setTimeKeyboardInput] = useState(false);
    const [timeSelectedIndex, setTimeSelectedIndex] = useState(Number(periodTime.time) - 1);
    const [timeUnitSelectedIndex, setTimeUnitSelectedIndex] = useState(timeUnits.indexOf(periodTime.timeUnit));
    const [tmpTime, setTmpTime] = useState(periodTime.time);

    const theme = useTheme();

    const onPeriodModalOpen = () => {
        Keyboard.dismiss();
        setVisiblePeriodModal(true);
    };

    const onPeriodModalClose = () => {
        setPeriodSelectedIndex(Number(periodTime.period) - 1);
        setPeriodUnitSelectedIndex(periodUnitNames.indexOf(periodTime.periodUnit));

        Keyboard.dismiss();
        setVisiblePeriodModal(false);
    };

    const onPeriodModalOkay = () => {
        let periodIndex;
        let period;

        if (periodKeyboardInput) {
            if (Number(tmpPeriod) > 0 & Number(tmpPeriod) < periodUnitValues[periodUnitSelectedIndex]) {
                periodIndex = Number(tmpPeriod) - 1;
            } else {
                console.log(`1 ~ ${periodUnitValues[periodUnitSelectedIndex]} 사이의 숫자를 입력해주세요`);
                return;
            }

            setPeriodSelectedIndex(periodIndex);
            if (Number(tmpPeriod) < 10) {
                period = `0${Number(tmpPeriod)}`
            } else {
                period = `${Number(tmpPeriod)}`
            }
        } else {
            if (periodSelectedIndex > periodUnitValues[periodUnitSelectedIndex] - 2) {
                console.log(`${periodUnitValues[periodUnitSelectedIndex]}보다 작은 숫자를 선택해주세요`);
                return;
            }
        }

        onPeriodChange(periodKeyboardInput ? period : periodNumbers[periodSelectedIndex]);
        onPeriodUnitChange(periodUnitNames[periodUnitSelectedIndex]);

        setTmpPeriod(periodKeyboardInput ? period : periodNumbers[periodSelectedIndex]);

        Keyboard.dismiss();
        setVisiblePeriodModal(false);
    };

    const onPeriodKeyboardInputChange = () => {
        setPeriodKeyboardInput(!periodKeyboardInput);
    };

    const onPeriodSelectedIndexChange = (index) => {
        setPeriodSelectedIndex(index);
    };

    const onPeriodUnitSelectedIndexChange = (index) => {
        setPeriodUnitSelectedIndex(index);
        setPeriodSelectedIndex(0);
    };

    const onTimeModalOpen = () => {
        Keyboard.dismiss();
        setvisibleTimeModal(true);
    };

    const onTimeModalClose = () => {
        setTimeSelectedIndex(Number(periodTime.time) - 1);
        setTimeUnitSelectedIndex(timeUnits.indexOf(periodTime.timeUnit));

        Keyboard.dismiss();
        setvisibleTimeModal(false);
    };

    const onTimeModalOkay = () => {
        let timeIndex;

        if (timeKeyboardInput) {
            if (Number(tmpTime) > 0 & Number(tmpTime) < 61) {
                timeIndex = Number(tmpTime) - 1;
            } else {
                console.log('1 ~ 60 사이의 숫자를 입력해주세요');
                return;
            }

            setTimeSelectedIndex(timeIndex);
        }

        onTimeChange(timeNumbers[timeKeyboardInput ? timeIndex : timeSelectedIndex]);
        onTimeUnitChange(timeUnits[timeUnitSelectedIndex]);
        
        setTmpTime(timeNumbers[timeKeyboardInput ? timeIndex : timeSelectedIndex]);
        
        Keyboard.dismiss();
        setvisibleTimeModal(false);
    };

    const onTimeKeyboardInputChange = () => {
        setTimeKeyboardInput(!timeKeyboardInput);
    };

    const onTimeSelectedIndexChange = (index) => {
        setTimeSelectedIndex(index);
    };

    const onTimeUnitSelectedIndexChange = (index) => {
        setTimeUnitSelectedIndex(index);
    };

    return (
        <View style={_styles.block}>
            <View style={[_styles.body, { marginBottom: 3 }]}>
                <TextInput
                    style={_styles.textInput}
                    mode='outlined'
                    right={
                        <TextInput.Icon
                            icon='clock-outline'
                            color={theme.colors.secondary}
                            disabled={disabled}
                            onPress={onPeriodModalOpen}
                        />
                    }
                    value={`${periodTime.period} ${periodTime.periodUnit}`}
                    disabled={disabled}
                    editable={false}
                />
                <Text variant='bodyLarge'>마다</Text>
            </View>
            <Portal>
                <Modal
                    visible={visiblePeriodModal}
                    onDismiss={onPeriodModalClose}
                    contentContainerStyle={_styles.modal}
                >
                    <View style={_styles.modalBody}>
                        {periodKeyboardInput ? (
                            <OutlineTextInput
                                style={_styles.textInput}
                                label='주기'
                                value={tmpPeriod}
                                onChangeText={setTmpPeriod}
                            />
                        ) : (
                            <Picker
                                style={_styles.wheelPicker}
                                selectedIndex={periodSelectedIndex}
                                options={periodNumbers}
                                onChange={onPeriodSelectedIndexChange}
                            />
                        )}
                        <Picker
                            selectedIndex={periodUnitSelectedIndex}
                            options={periodUnitNames}
                            onChange={onPeriodUnitSelectedIndexChange}
                        />
                    </View>
                    <View style={_styles.buttons}>
                        <IconButton
                            icon={periodKeyboardInput ? 'keyboard-outline' : 'keyboard'}
                            iconColor='#000000'
                            onPress={onPeriodKeyboardInputChange}
                        />
                        <View style={_styles.rightButtons}>
                            <Button onPress={onPeriodModalClose} textColor={theme.colors.error}>취소</Button>
                            <Button onPress={onPeriodModalOkay} textColor={theme.colors.info}>확인</Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
            <View style={_styles.body}>
                <TextInput
                    style={_styles.textInput}
                    mode='outlined'
                    right={
                        <TextInput.Icon
                            icon='clock-outline'
                            color={theme.colors.secondary}
                            disabled={disabled}
                            onPress={onTimeModalOpen}
                        />
                    }
                    value={`${periodTime.time} ${periodTime.timeUnit}`}
                    disabled={disabled}
                    editable={false}
                />
                <Text variant='bodyLarge'>동안 {name}</Text>
            </View>
            <Portal>
                <Modal
                    visible={visibleTimeModal}
                    onDismiss={onTimeModalClose}
                    contentContainerStyle={_styles.modal}
                >
                    <View style={_styles.modalBody}>
                        {timeKeyboardInput ? (
                            <OutlineTextInput
                                style={_styles.textInput}
                                label='기간'
                                value={tmpTime}
                                onChangeText={setTmpTime}
                            />
                        ) : (
                            <Picker
                                style={_styles.wheelPicker}
                                selectedIndex={timeSelectedIndex}
                                options={timeNumbers}
                                onChange={onTimeSelectedIndexChange}
                            />
                        )}
                        <Picker
                            selectedIndex={timeUnitSelectedIndex}
                            options={timeUnits}
                            onChange={onTimeUnitSelectedIndexChange}
                        />
                    </View>
                    <View style={_styles.buttons}>
                        <IconButton
                            icon={timeKeyboardInput ? 'keyboard-outline' : 'keyboard'}
                            iconColor='#000000'
                            onPress={onTimeKeyboardInputChange}
                        />
                        <View style={_styles.rightButtons}>
                            <Button onPress={onTimeModalClose} textColor={theme.colors.error}>취소</Button>
                            <Button onPress={onTimeModalOkay} textColor={theme.colors.info}>확인</Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
}

const _styles = StyleSheet.create({
    block: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        marginRight: 10
    },
    modal: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 20
    },
    modalBody: {
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

export default TextWithDateTimePicker;