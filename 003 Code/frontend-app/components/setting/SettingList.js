import React from 'react';
import {
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Divider } from 'react-native-paper';
import SettingBox from './SettingBox';
import SettingItem from '../../containers/setting/SettingItem';
import profile from '../../assets/icon/profile.png';
import lock from '../../assets/icon/lock.png';
import greenhouse from '../../assets/icon/greenhouse.png';
import plant from '../../assets/icon/plant.png';
import bell from '../../assets/icon/bell.png';

function SettingList({
    existSmartfarm,
    existPlant,
    goRegisterSmartfarm,
    goRegisterPlant
}) {
    const userSetting = [
        {
            id: 1,
            image: profile,
            title: '개인정보 수정',
            destination: 'SettingPersonalInformation'
        },
        {
            id: 2,
            image: lock,
            title: '비밀번호 변경',
            destination: 'SettingVerify',
            nextDestination: 'SettingPassword'
        }
    ];
    const smartfarmSetting = {
        image: greenhouse,
        title: '스마트팜 수정',
        destination: 'SettingVerify',
        nextDestination: 'SettingSmartfarm'
    };
    const plantSetting = {
        image: plant,
        title: '작물 수정',
        destination: 'SettingVerify',
        nextDestination: 'SettingPlant'
    };
    const systemSetting = {
        image: bell,
        title: '푸시 알람 설정',
        destination: 'SettingAlarm'
    };

    return (
        <SafeAreaView style={styles.block}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <SettingBox title='사용자'>
                    {userSetting.map((setting) => (
                        setting.id === 1 ? (
                            <SettingItem key={setting.id} setting={setting}/>
                        ) : (
                            <View key={setting.id}>
                                <Divider />
                                <SettingItem setting={setting}/>
                            </View>
                        )
                    ))}
                </SettingBox>
                <Divider />
                <SettingBox title='스마트팜'>
                    {!existSmartfarm ? (
                        <Button
                            style={styles.button}
                            mode='contained'
                            onPress={goRegisterSmartfarm}
                        >
                            스마트팜 등록
                        </Button>
                    ) : (
                        <SettingItem setting={smartfarmSetting}/>
                    )}
                </SettingBox>
                <Divider />
                <SettingBox title='작물'>
                    {!existPlant ? (
                        <Button
                            style={styles.button}
                            mode='contained'
                            onPress={goRegisterPlant}
                        >
                            작물 등록
                        </Button>
                    ) : (
                        <SettingItem setting={plantSetting}/>
                    )}
                </SettingBox>
                <Divider />
                <SettingBox title='시스템'>
                    <SettingItem setting={systemSetting}/>
                </SettingBox>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    button: {
        borderRadius: 5,
        marginTop: 30,
        marginBottom: 30
    }
});

export default SettingList;