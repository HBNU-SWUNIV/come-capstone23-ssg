import React from 'react';
import {
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import { Button, Divider } from 'react-native-paper';
import SettingBox from './SettingBox';
import TextWithSwitch from '../common/TextWithSwitch';

function SettingAlarm({
    settingAlarm,
    onModifyPersonalInformationChange,
    onLogInOutChange,
    onModifySmartfarmChange,
    onAutoControlSmartfarmChange,
    onWarnSmartfarmChange,
    onModifyPlantChange,
    onHarvestPlantChange,
    goRegisterSmartfarm,
    goRegisterPlant
}) {
    const existSmartfarm = true;
    const existPlant = true;
    const userSettingAlarm = [
        {
            id: 1,
            text: '개인정보 수정 알람',
            value: settingAlarm.modifyPersonalInformation,
            onChange: onModifyPersonalInformationChange
        },
        {
            id: 2,
            text: '로그인/로그아웃 알람',
            value: settingAlarm.logInOut,
            onChange: onLogInOutChange
        }
    ];
    const smartfarmSettingAlarm = [
        {
            id: 1,
            text: '스마트팜 정보 수정 알람',
            value: settingAlarm.modifySmartfarm,
            onChange: onModifySmartfarmChange
        },
        {
            id: 2,
            text: '스마트팜 현장/원격 제어 알람',
            value: settingAlarm.autoControlSmartfarm,
            onChange: onAutoControlSmartfarmChange
        },
        {
            id: 3,
            text: '스마트팜 이상 경고 알람',
            value: settingAlarm.warnSmartfarm,
            onChange: onWarnSmartfarmChange
        }
    ];
    const plantSettingAlarm = [
        {
            id: 1,
            text: '작물 정보 수정 알람',
            value: settingAlarm.modifyPlant,
            onChange: onModifyPlantChange
        },
        {
            id: 2,
            text: '작물 적정 수확 시기 알람',
            value: settingAlarm.harvestPlant,
            onChange: onHarvestPlantChange
        }
    ];

    return (
        <ScrollView
            style={styles.block}
            showsVerticalScrollIndicator={false}
        >
            <SettingBox title='사용자'>
                {userSettingAlarm.map((settingAlarm) => (
                    settingAlarm.id === 1 ? (
                        <TextWithSwitch
                            key={settingAlarm.id}
                            name={settingAlarm.text}
                            value={settingAlarm.value}
                            onChange={settingAlarm.onChange}
                        />
                    ) : (
                        <View key={settingAlarm.id}>
                            <Divider />
                            <TextWithSwitch
                                name={settingAlarm.text}
                                value={settingAlarm.value}
                                onChange={settingAlarm.onChange}
                            />
                        </View>
                    )
                ))}
            </SettingBox>
            <Divider />
            <SettingBox title='스마트팜'>
                {existSmartfarm === false ? (
                    <Button
                        style={styles.button}
                        mode='contained'
                        onPress={goRegisterSmartfarm}
                    >
                        스마트팜 등록
                    </Button>
                ) : (
                    smartfarmSettingAlarm.map((settingAlarm) => (
                        settingAlarm.id === 1 ? (
                            <TextWithSwitch
                                key={settingAlarm.id}
                                name={settingAlarm.text}
                                value={settingAlarm.value}
                                onChange={settingAlarm.onChange}
                            />
                        ) : (
                            <View key={settingAlarm.id}>
                                <Divider />
                                <TextWithSwitch
                                    name={settingAlarm.text}
                                    value={settingAlarm.value}
                                    onChange={settingAlarm.onChange}
                                />
                            </View>
                        )
                    ))
                )}
            </SettingBox>
            <Divider />
            <SettingBox title='작물'>
                {existPlant === false ? (
                    <Button
                        style={styles.button}
                        mode='contained'
                        onPress={goRegisterPlant}
                    >
                        작물 등록
                    </Button>
                ) : (
                    plantSettingAlarm.map((settingAlarm) => (
                        settingAlarm.id === 1 ? (
                            <TextWithSwitch
                                key={settingAlarm.id}
                                name={settingAlarm.text}
                                value={settingAlarm.value}
                                onChange={settingAlarm.onChange}
                            />
                        ) : (
                            <View key={settingAlarm.id}>
                                <Divider />
                                <TextWithSwitch
                                    name={settingAlarm.text}
                                    value={settingAlarm.value}
                                    onChange={settingAlarm.onChange}
                                />
                            </View>
                        )
                    ))
                )}
            </SettingBox>
        </ScrollView>
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

export default SettingAlarm;