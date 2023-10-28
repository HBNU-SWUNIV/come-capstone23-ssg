import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../App';
import { check } from '../slices/user/user';
import Header from '../components/common/Header';
// 회원가입
import VerifyScreen from './user/VerifyScreen';
import SignUpScreen from './user/SignUpScreen';
import SignUpSuccessScreen from './user/SignUpSuccessScreen';
// 로그인
import LogInScreen from './user/LogInScreen';
// 아이디 찾기
import SearchIdScreen from './user/SearchIdScreen';
import SearchIdSuccessScreen from './user/SearchIdSuccessScreen';
import SearchIdFailureScreen from './user/SearchIdFailureScreen';
// 비밀번호 찾기
import SearchPasswordScreen from './user/SearchPasswordScreen';
import SearchPasswordSuccessScreen from './user/SearchPasswordSuccessScreen';
import SearchPasswordFailureScreen from './user/SearchPasswordFailureScreen';
// 그 외 화면
import MainTab from './MainTab';

async function loadToken() {
	try {
		const token = await AsyncStorage.getItem('token');

		if (!token) return;

		store.dispatch(check(token));
	} catch (e) {
        console.log(e);
		console.log('asyncStorage is not working');
	}
}

const Stack = createNativeStackNavigator();

function RootStack() {
    useEffect(() => {
        loadToken();
    }, []);

    const token = useSelector(state => state.user.token);

    return (
        <Stack.Navigator
            initialRouteName='LogIn'
            screenOptions={{
                header: (props) => <Header {...props}/>,
                contentStyle: {
                    backgroundColor: '#ffffff'
                }
            }}
        >
            {token === null ? (
                <>
                    <Stack.Screen
                        name='Verify'
                        component={VerifyScreen}
                        options={{ title: '본인인증' }}
                    />
                    <Stack.Screen
                        name='SignUp'
                        component={SignUpScreen}
                        options={{ title: '회원가입' }}
                    />
                    <Stack.Screen
                        name='SignUpSuccess'
                        component={SignUpSuccessScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='LogIn'
                        component={LogInScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='SearchId'
                        component={SearchIdScreen}
                        options={{ title: '아이디 찾기' }}
                    />
                    <Stack.Screen
                        name='SearchIdSuccess'
                        component={SearchIdSuccessScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='SearchIdFailure'
                        component={SearchIdFailureScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='SearchPassword'
                        component={SearchPasswordScreen}
                        options={{ title: '비밀번호 찾기' }}
                    />
                    <Stack.Screen
                        name='SearchPasswordSuccess'
                        component={SearchPasswordSuccessScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='SearchPasswordFailure'
                        component={SearchPasswordFailureScreen}
                        options={{ headerShown: false }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name='MainTab'
                        component={MainTab}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}

export default RootStack;