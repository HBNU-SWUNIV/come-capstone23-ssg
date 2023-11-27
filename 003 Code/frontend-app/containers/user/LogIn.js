import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import LogInComponent from '../../components/user/LogIn';
import {
    changeId,
    changePassword,
    loginInitialize,
    login
} from '../../slices/user/user';

function LogIn() {
    const id = useSelector(state => state.user.id);
    const password = useSelector(state => state.user.password);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onIdChange = useCallback(e => dispatch(changeId(e)), [dispatch]);
    const onPasswordChange = useCallback(e => (dispatch(changePassword(e))), [dispatch]);

    const clear = () => {dispatch(loginInitialize())};

    const onLogIn = async () => {
        const fcmToken = await messaging().getToken();
        
        dispatch(login({
            id,
            password,
            fcmToken
        }));
    };

    const goVerify = () => {
        navigation.navigate('Verify');
        clear();
    };

    const goSearchId = () => {
        navigation.navigate('SearchId');
        clear();
    };

    const goSearchPassword = () => {
        navigation.navigate('SearchPassword');
        clear();
    };

    return (
        <LogInComponent
            id={id}
            password={password}
            onIdChange={onIdChange}
            onPasswordChange={onPasswordChange}
            onLogIn={onLogIn}
            goVerify={goVerify}
            goSearchId={goSearchId}
            goSearchPassword={goSearchPassword}
        />
    );
}

export default React.memo(LogIn);