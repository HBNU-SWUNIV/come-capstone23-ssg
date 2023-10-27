import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import SettingVerifyComponent from '../../components/setting/SettingVerify';
import { changePassword, verifyInitialize, verify } from '../../modules/user/user';

const SettingVerify = () => {
    const token = useSelector(state => state.user.token);
    const password = useSelector(state => state.user.password);
    const verifySuccess = useSelector(state => state.user.verifySuccess);

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const onPasswordChange = useCallback(e => dispatch(changePassword(e.target.value)), [dispatch]);

    const onVerifyClick = () => {
        dispatch(verify({
            token,
            password
        }));
    };
    const goBack = () => {
        navigate(process.env.REACT_APP_SETTING_PATH);
    };

    useEffect(() => {
        if (verifySuccess) {
            switch (params.destination) {
                case 'password':
                    navigate(process.env.REACT_APP_SETTING_PASSWORD_PATH);
                    break;
                case 'smartfarm':
                    navigate(process.env.REACT_APP_SETTING_SMARTFARM_PATH);
                    break;
                case 'plant':
                    navigate(process.env.REACT_APP_SETTING_PLANT_PATH);
                    break;
                default:
                    break;
            }
        }

        return () => dispatch(verifyInitialize());
    }, [dispatch, verifySuccess, params.destination, navigate]);

    return (
        <SettingVerifyComponent
            password={password}
            onPasswordChange={onPasswordChange}
            onVerifyClick={onVerifyClick}
            goBack={goBack}
        />
    );
};

export default React.memo(SettingVerify);