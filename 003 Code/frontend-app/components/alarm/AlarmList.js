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
    goRegisterSmartfarm,
    goRegisterPlant
}) {
    const userAlarm = null;
    const smartfarmAlarm = [
        {id: 1, text: '현장 제어 모드로 설정하셨습니다.', time: '15분 전'},
        {id: 2, text: '원격 제어 모드로 설정하셨습니다.', time: '2시간 전'}
    ];
    const plantAlarm = [
        {id: 1, text: '작물을 키우기 시작하셨습니다.', time: '10일 전'},
        {id: 2, text: '작물 이름을 \'새싹이\'로 변경하셨습니다.', time: '3일 전'}
    ];

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