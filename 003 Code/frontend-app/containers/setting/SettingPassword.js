import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SettingPasswordComponent from '../../components/setting/SettingPassword';
import {
    changePassword,
    changePasswordCheck,
    modifyPasswordInitialize,
    modifyPassword
} from '../../slices/user/user';

function SettingPassword() {
    const token = useSelector(state => state.user.token);
    const password = useSelector(state => state.user.password);
    const passwordCheck = useSelector(state => state.user.passwordCheck);
    const modifyPasswordSuccess = useSelector(state => state.user.modifyPasswordSuccess);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onPasswordChange = useCallback(e => dispatch(changePassword(e)), [dispatch]);
    const onPasswordCheckChange = useCallback(e => dispatch(changePasswordCheck(e)), [dispatch]);

    const clear = () => {dispatch(modifyPasswordInitialize())};

    const onModify = () => {
        dispatch(modifyPassword({
            token,
            password
        }));
    };

    const goBack = () => {
        navigation.pop();
        clear();
    };

    useEffect(() => {
        if (modifyPasswordSuccess) {
            navigation.pop();
            clear();
        }
    }, [modifyPasswordSuccess, navigation, clear]);

    return (
        <SettingPasswordComponent
            password={password}
            passwordCheck={passwordCheck}
            onPasswordChange={onPasswordChange}
            onPasswordCheckChange={onPasswordCheckChange}
            onModify={onModify}
            goBack={goBack}
        />
    );
}

export default React.memo(SettingPassword);