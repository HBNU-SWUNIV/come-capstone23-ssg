import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text } from 'react-native-paper';
import RemoteControlSwitch from '../../containers/smartfarm/RemoteControlSwitch';
import TextWithButton from '../common/TextWithButton';
import TextWithCheckbox from '../common/TextWithCheckbox';
import TextWithTimePicker from '../common/TextWithTimePicker';

function CenterDoorControl({
    remoteControl,
    centerDoorControl,
    onWorkChange,
    onAutoWorkChange,
    onAutoWorkStartDayNightChange,
    onAutoWorkStartHourChange,
    onAutoWorkStartMinutChange,
    onAutoWorkEndDayNightChange,
    onAutoWorkEndHourChange,
    onAutoWorkEndMinutChange
}) {
    return (
        <SafeAreaView style={styles.block}>
            <RemoteControlSwitch />
            <Card style={styles.card}>
                <Card.Content>
                    <TextWithButton
                        name='문 열기/닫기'
                        buttonText={centerDoorControl.workButtonText}
                        disabled={!remoteControl || centerDoorControl.autoWork}
                        onPress={onWorkChange}
                    />
                    <TextWithCheckbox
                        name='자동 문 열기/닫기'
                        value={centerDoorControl.autoWork}
                        disabled={!remoteControl}
                        onPress={onAutoWorkChange}
                    />
                    <TextWithTimePicker
                        name='여는 시각'
                        time={centerDoorControl.autoWorkStart}
                        disabled={!centerDoorControl.autoWork}
                        onDayNightChange={onAutoWorkStartDayNightChange}
                        onHourChange={onAutoWorkStartHourChange}
                        onMinuteChange={onAutoWorkStartMinutChange}
                    />
                    <TextWithTimePicker
                        name='닫는 시각'
                        time={centerDoorControl.autoWorkEnd}
                        disabled={!centerDoorControl.autoWork}
                        onDayNightChange={onAutoWorkEndDayNightChange}
                        onHourChange={onAutoWorkEndHourChange}
                        onMinuteChange={onAutoWorkEndMinutChange}
                    />
                </Card.Content>
            </Card>
            <Text style={styles.text} variant='bodyLarge'>{centerDoorControl.status}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        marginRight: 20,
        marginLeft: 20
    },
    card: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderRadius: 5
    },
    text: {
        marginTop: 35,
        textAlign: 'center'
    }
});

export default CenterDoorControl;