import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/common/Header';
// 설정 목록
import SettingScreen from './setting/SettingScreen';
// 비밀번호 확인
import SettingVerifyScreen from './setting/SettingVerifyScreen';
// 개인정보 수정
import SettingPersonalInformationScreen from './setting/SettingPersonalInformationScreen';
// 비밀번호 변경
import SettingPasswordScreen from './setting/SettingPasswordScreen';
// 스마트팜 수정
import SettingSmartfarmScreen from './setting/SettingSmartfarm';
import RemoveSmartfarmSuccessScreen from './setting/RemoveSmartfarmSuccess';
// 작물 수정
import SettingPlantScreen from './setting/SettingPlantScreen';
import RemovePlantSuccessScreen from './setting/RemovePlantSuccess';
// 푸시 알람 설정
import SettingAlarmScreen from './setting/SettingAlarmScreen';

const Stack = createNativeStackNavigator();

function SettingStack() {
    return (
        <Stack.Navigator
            initialRouteName='_Setting'
            screenOptions={{
                header: (props) => <Header {...props}/>,
                contentStyle: {
                    backgroundColor: '#ffffff'
                }
            }}
        >
            <Stack.Screen
                name='_Setting'
                component={SettingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SettingVerify'
                component={SettingVerifyScreen}
                options={({ route }) => ({
                    title: route.params.title
                })}
            />
            <Stack.Screen
                name='SettingPersonalInformation'
                component={SettingPersonalInformationScreen}
                options={{ title: '개인정보 수정' }}
            />
            <Stack.Screen
                name='SettingPassword'
                component={SettingPasswordScreen}
                options={{
                    title: '비밀번호 변경',
                    backBehavior: 'initialRoute'
                }}
            />
            <Stack.Screen
                name='SettingSmartfarm'
                component={SettingSmartfarmScreen}
                options={{ title: '스마트팜 수정' }}
            />
            <Stack.Screen
                name='RemoveSmartfarmSuccess'
                component={RemoveSmartfarmSuccessScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SettingPlant'
                component={SettingPlantScreen}
                options={{ title: '작물 수정' }}
            />
            <Stack.Screen
                name='RemovePlantSuccess'
                component={RemovePlantSuccessScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SettingAlarm'
                component={SettingAlarmScreen}
                options={{ title: '푸시 알람 설정' }}
            />
        </Stack.Navigator>
    );
}

export default SettingStack;