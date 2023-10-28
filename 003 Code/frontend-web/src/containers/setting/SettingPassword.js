import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingPasswordComponent from '../../components/setting/SettingPassword';
import { changePassword, changePasswordCheck, modifyPasswordInitialize, modifyPassword } from '../../modules/user/user';

const SettingPassword = () => {
    const token = useSelector(state => state.user.token);
    const password = useSelector(state => state.user.password);
    const passwordCheck = useSelector(state => state.user.passwordCheck);
    const modifyPasswordSuccess = useSelector(state => state.user.modifyPasswordSuccess);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onPasswordChange = useCallback(e => dispatch(changePassword(e.target.value)), [dispatch]);
    const onPasswordCheckChange = useCallback(e => dispatch(changePasswordCheck(e.target.value)), [dispatch]);

    const onModifyClick = () => {
        dispatch(modifyPassword({
            token,
            password
        }));
    };
    const goBack = () => {
        navigate(process.env.REACT_APP_SETTING_PATH);
    };

    useEffect(() => {
        if (modifyPasswordSuccess) {
            navigate(process.env.REACT_APP_SETTING_PATH);
        }

        return () => dispatch(modifyPasswordInitialize());
    }, [modifyPasswordSuccess, navigate, dispatch]);

    return (
        <SettingPasswordComponent
            password={password}
            passwordCheck={passwordCheck}
            onPasswordChange={onPasswordChange}
            onPasswordCheckChange={onPasswordCheckChange}
            onModifyClick={onModifyClick}
            goBack={goBack}
        />
    );
};

export default React.memo(SettingPassword);