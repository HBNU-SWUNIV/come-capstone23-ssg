import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/common/Header';
// 홈
import HomeScreen from './smartfarm/HomeScreen';
// 스마트팜 등록
import RegisterSmartfarmScreen from './smartfarm/RegisterSmartfarmScreen';
import RegisterSmartfarmSuccessScreen from './smartfarm/RegisterSmartfarmSuccessScreen';
// 작물 등록
import RegisterPlantScreen from './smartfarm/RegisterPlantScreen';
import RegisterPlantSuccessScreen from './smartfarm/RegisterPlantSuccessScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName='_Home'
            screenOptions={{
                header: (props) => <Header {...props}/>,
                contentStyle: {
                    backgroundColor: '#ffffff'
                }
            }}
        >
            <Stack.Screen
                name='_Home'
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='RegisterSmartfarm'
                component={RegisterSmartfarmScreen}
                options={{ title: '스마트팜 등록' }}
            />
            <Stack.Screen
                name='RegisterSmartfarmSuccess'
                component={RegisterSmartfarmSuccessScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='RegisterPlant'
                component={RegisterPlantScreen}
                options={{ title: '작물 등록' }}
            />
            <Stack.Screen
                name='RegisterPlantSuccess'
                component={RegisterPlantSuccessScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;