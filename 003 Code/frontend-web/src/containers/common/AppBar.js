import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppBarComponent from '../../components/common/AppBar';
import { logout } from '../../modules/user/user';

const AppBar = ({ text, children }) => {
    const name = useSelector(state => state.user.name);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogOutClick = useCallback(() => {
        dispatch(logout());
        navigate(process.env.REACT_APP_LOGIN_PATH);
    }, [dispatch, navigate]);

    const goHome = () => {
        navigate(process.env.REACT_APP_HOME_PATH);
    };
    const goSmartfarm = () => {
        navigate(process.env.REACT_APP_CONTROL_LED_PATH);
    };
    const goAlarm = () => {
        navigate(process.env.REACT_APP_ALARM_PATH);
    };
    const goSetting = () => {
        navigate(process.env.REACT_APP_SETTING_PATH);
    };

    return (
        <AppBarComponent
            name={name}
            text={text}
            children={children}
            onLogOutClick={onLogOutClick}
            goHome={goHome}
            goSmartfarm={goSmartfarm}
            goAlarm={goAlarm}
            goSetting={goSetting}
        />
    );
};

export default React.memo(AppBar);