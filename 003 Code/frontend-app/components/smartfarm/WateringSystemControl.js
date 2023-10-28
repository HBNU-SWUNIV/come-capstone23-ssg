import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text } from 'react-native-paper';
import RemoteControlSwitch from '../../containers/smartfarm/RemoteControlSwitch';
import TextWithButton from '../common/TextWithButton';
import TextWithNumberPicker from '../../containers/common/TextWithNumberPicker';
import TextWithPeriodPicker from '../../containers/common/TextWithPeriodPicker';
import TextWithCheckbox from '../common/TextWithCheckbox';

function WateringSystemControl({
    remoteControl,
    wateringSystemControl,
    onWorkChange,
    onWorkTimeChange,
    onAutoWorkChange,
    onAutoWorkPeriodChange
}) {
    const workTimeNumbers = [
        8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22
    ];
    const periodNumbers = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24
    ];

    return (
        <SafeAreaView style={styles.block}>
            <RemoteControlSwitch />
            <Card style={styles.card}>
                <Card.Content>
                    <TextWithButton
                        name='물 주기/중단하기'
                        buttonText={wateringSystemControl.workButtonText}
                        disabled={!remoteControl || wateringSystemControl.work || wateringSystemControl.autoWork}
                        onPress={onWorkChange}
                    />
                    <TextWithNumberPicker
                        name='물 주는 시간'
                        numbers={workTimeNumbers}
                        disabled={!remoteControl || wateringSystemControl.work}
                        onChange={onWorkTimeChange}
                    />
                    <TextWithCheckbox
                        name='자동 물 주기/중단하기'
                        value={wateringSystemControl.autoWork}
                        disabled={!remoteControl}
                        onPress={onAutoWorkChange}
                    />
                    <TextWithPeriodPicker
                        name='물 주기'
                        workTime={wateringSystemControl.workTime}
                        periodNumbers={periodNumbers}
                        disabled={!wateringSystemControl.autoWork}
                        onChange={onAutoWorkPeriodChange}
                    />
                </Card.Content>
            </Card>
            <Text style={styles.text} variant='bodyLarge'>관수 시스템에 전원 공급을 하고 있지 않아요</Text>
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

export default WateringSystemControl;