import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text } from 'react-native-paper';
import RemoteControlSwitch from '../../containers/smartfarm/RemoteControlSwitch';
import TextWithButton from '../common/TextWithButton';
import TextWithCheckbox from '../common/TextWithCheckbox';
import TextWithTimePicker from '../common/TextWithTimePicker';

function LedControl({
    remoteControl,
    ledControl,
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
                        name='켜기/끄기'
                        buttonText={ledControl.workButtonText}
                        disabled={!remoteControl || ledControl.autoWork}
                        onPress={onWorkChange}
                    />
                    <TextWithCheckbox
                        name='자동 켜기/끄기'
                        value={ledControl.autoWork}
                        disabled={!remoteControl}
                        onPress={onAutoWorkChange}
                    />
                    <TextWithTimePicker
                        name='켜는 시각'
                        time={ledControl.autoWorkStart}
                        disabled={!ledControl.autoWork}
                        onDayNightChange={onAutoWorkStartDayNightChange}
                        onHourChange={onAutoWorkStartHourChange}
                        onMinuteChange={onAutoWorkStartMinutChange}
                    />
                    <TextWithTimePicker
                        name='끄는 시각'
                        time={ledControl.autoWorkEnd}
                        disabled={!ledControl.autoWork}
                        onDayNightChange={onAutoWorkEndDayNightChange}
                        onHourChange={onAutoWorkEndHourChange}
                        onMinuteChange={onAutoWorkEndMinutChange}
                    />
                </Card.Content>
            </Card>
            <Text style={styles.text} variant='bodyLarge'>{ledControl.status}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        marginRight: 25,
        marginLeft: 25
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

export default LedControl;