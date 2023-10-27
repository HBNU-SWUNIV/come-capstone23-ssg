import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogInComponent from '../../components/user/LogIn';
import { changeId, changePassword, loginInitialize, login } from '../../modules/user/user';
import { showSnackbar } from '../../modules/common';

const LogIn = () => {
    const token = useSelector(state => state.user.token);
    const id = useSelector(state => state.user.id);
    const password = useSelector(state => state.user.password);
    const loginSuccess = useSelector(state => state.user.loginSuccess);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onIdChange = useCallback(e => dispatch(changeId(e.target.value)), [dispatch]);
    const onPasswordChange = useCallback(e => dispatch(changePassword(e.target.value)), [dispatch]);

    const onLogInClick = () => {
        dispatch(login({
            id,
            password
        }));
    };
    const goVerify = () => {
        navigate(process.env.REACT_APP_VERIFY_PATH);
    };

    useEffect(() => {
        if (loginSuccess && token !== null) {
            try {
                localStorage.setItem('token', token);

                navigate(process.env.REACT_APP_HOME_PATH);
            } catch (e) {
                dispatch(showSnackbar('잠시 후 시도해주세요'));
            }
        }

        return () => dispatch(loginInitialize())
    }, [loginSuccess, token, navigate, dispatch]);

    return (
        <LogInComponent
            id={id}
            password={password}
            onIdChange={onIdChange}
            onPasswordChange={onPasswordChange}
            onLogInClick={onLogInClick}
            goVerify={goVerify}
        />
    );
};

export default React.memo(LogIn);