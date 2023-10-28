import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import SettingVerifyComponent from '../../components/setting/SettingVerify';
import {
    changePassword,
    verifyInitialize,
    verify
} from '../../slices/user/user';

function SettingVerify() {
    const token = useSelector(state => state.user.token);
    const password = useSelector(state => state.user.password);
    const verifySuccess = useSelector(state => state.user.verifySuccess);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const onPasswordChange = useCallback(e => dispatch(changePassword(e)), [dispatch]);

    const clear = () => dispatch(verifyInitialize());

    const goNext = () => {
        dispatch(verify({
            token,
            password
        }));
    };

    const goBack = () => {
        navigation.pop();
        clear();
    };

    useEffect(() => {
        if (verifySuccess) {
            navigation.replace(route.params.destination);
        }
    }, [verifySuccess, navigation]);

    return (
        <SettingVerifyComponent
            password={password}
            onPasswordChange={onPasswordChange}
            goNext={goNext}
            goBack={goBack}
        />
    );
}

export default React.memo(SettingVerify);