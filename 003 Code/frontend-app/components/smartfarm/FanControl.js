import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text } from 'react-native-paper';
import RemoteControlSwitch from '../../containers/smartfarm/RemoteControlSwitch';
import TextWithButton from '../common/TextWithButton';
import TextWithCheckbox from '../common/TextWithCheckbox';
import TextWithTimePicker from '../common/TextWithTimePicker';

function FanControl({
    remoteControl,
    fanControl,
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
                        name='작동하기/중단하기'
                        buttonText={fanControl.workButtonText}
                        disabled={!remoteControl || fanControl.autoWork}
                        onPress={onWorkChange}
                    />
                    <TextWithCheckbox
                        name='자동 작동하기/중단하기'
                        value={fanControl.autoWork}
                        disabled={!remoteControl}
                        onPress={onAutoWorkChange}
                    />
                    <TextWithTimePicker
                        name='작동하는 시각'
                        time={fanControl.autoWorkStart}
                        disabled={!fanControl.autoWork}
                        onDayNightChange={onAutoWorkStartDayNightChange}
                        onHourChange={onAutoWorkStartHourChange}
                        onMinuteChange={onAutoWorkStartMinutChange}
                    />
                    <TextWithTimePicker
                        name='중단하는 시각'
                        time={fanControl.autoWorkEnd}
                        disabled={!fanControl.autoWork}
                        onDayNightChange={onAutoWorkEndDayNightChange}
                        onHourChange={onAutoWorkEndHourChange}
                        onMinuteChange={onAutoWorkEndMinutChange}
                    />
                </Card.Content>
            </Card>
            <Text style={styles.text} variant='bodyLarge'>{fanControl.status}</Text>
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

export default FanControl;