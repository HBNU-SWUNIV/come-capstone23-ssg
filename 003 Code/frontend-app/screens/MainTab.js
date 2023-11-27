import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useSelector } from "react-redux";
import FontIcon from 'react-native-vector-icons/FontAwesome6';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// 홈
import HomeStack from './HomeStack';
// 스마트팜 제어
import SmartfarmTab from './SmartfarmTab';
// 알람
import AlarmScreen from './alarm/AlarmScreen';
// 설정
import SettingStack from './SettingStack';

const Tab = createMaterialBottomTabNavigator();

function MainTab() {
    const smartfarmExist = useSelector(state => state.smartfarm.exist);

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                backgroundColor: '#ffffff'
            }}
            barStyle={{
                backgroundColor: '#ffffff'
            }}
            shifting={true}
        >
            <Tab.Screen
                name='Home'
                component={HomeStack}
                options={{
                    tabBarLabel: '홈',
                    tabBarIcon: ({ color }) => (
                        <FontIcon
                            name='house'
                            color={color}
                            size={24}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Smartfarm'
                component={smartfarmExist !== true ? HomeStack : SmartfarmTab}
                options={{
                    tabBarLabel: '스마트팜',
                    tabBarIcon: ({ color }) => (
                        <FontIcon
                            name='sliders'
                            color={color}
                            size={24}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Alarm'
                component={AlarmScreen}
                options={{
                    tabBarLabel: '알람',
                    tabBarIcon: ({ color }) => (
                        <IonIcon
                            name='notifications'
                            color={color}
                            size={24}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='Setting'
                component={SettingStack}
                options={{
                    tabBarLabel: '설정',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcon
                            name='settings'
                            color={color}
                            size={24}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default MainTab;