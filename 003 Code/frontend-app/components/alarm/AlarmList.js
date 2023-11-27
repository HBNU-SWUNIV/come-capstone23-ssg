import React from 'react';
import {
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Divider } from 'react-native-paper';
import AlarmBox from './AlarmBox';
import AlarmItem from '../../containers/alarm/AlarmItem';
import profile from '../../assets/icon/profile.png';
import greenhouse from '../../assets/icon/greenhouse.png';
import plant from '../../assets/icon/plant.png';

function AlarmList({
    existSmartfarm,
    existPlant,
    smartfarmAlarm,
    goRegisterSmartfarm,
    goRegisterPlant
}) {
    const userAlarm = null;
    const plantAlarm = null;

    return (
        <SafeAreaView style={styles.block}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <AlarmBox image={profile} title='사용자'>
                    {userAlarm && userAlarm.map((alarm) => (
                        alarm.id === 1 ? (
                            <AlarmItem key={alarm.id} alarm={alarm}/>
                        ) : (
                            <View key={alarm.id}>
                                <Divider />
                                <AlarmItem alarm={alarm}/>
                            </View >
                        )
                    ))}
                </AlarmBox>
                <Divider />
                <AlarmBox image={greenhouse} title='스마트팜'>
                    {!existSmartfarm ? (
                        <Button
                            style={styles.button}
                            mode='contained'
                            onPress={goRegisterSmartfarm}
                        >
                            스마트팜 등록
                        </Button>
                    ) : (
                        smartfarmAlarm && smartfarmAlarm.map((alarm) => (
                            alarm.id === 1 ? (
                                <AlarmItem key={alarm.id} alarm={alarm}/>
                            ) : (
                                <View key={alarm.id}>
                                    <Divider />
                                    <AlarmItem alarm={alarm}/>
                                </View >
                            )
                        ))
                    )}
                </AlarmBox>
                <Divider />
                <AlarmBox image={plant} title='작물'>
                    {!existPlant ? (
                        <Button
                            style={styles.button}
                            mode='contained'
                            onPress={goRegisterPlant}
                        >
                            작물 등록
                        </Button>
                    ) : (
                        plantAlarm && plantAlarm.map((alarm) => (
                            alarm.id === 1 ? (
                                <AlarmItem key={alarm.id} alarm={alarm}/>
                            ) : (
                                <View key={alarm.id}>
                                    <Divider />
                                    <AlarmItem alarm={alarm}/>
                                </View>
                            )
                        ))
                    )}
                </AlarmBox>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    button: {
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 30
    }
});

export default AlarmList;