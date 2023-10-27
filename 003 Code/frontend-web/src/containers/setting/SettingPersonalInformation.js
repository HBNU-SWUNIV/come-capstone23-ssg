import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingPersonalInformationComponent from '../../components/setting/SettingPersonalInformation';
import { changeName, changePhoneNumber, changePassword, modifyPersonalInformationInitialize, modifyPersonalInformation, withdraw } from '../../modules/user/user';

const SettingPersonalInformation = () => {
    const token = useSelector(state => state.user.token);
    const name = useSelector(state => state.user.name);
    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const password = useSelector(state => state.user.password);
    const withdrawSuccess = useSelector(state => state.user.withdrawSuccess);

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNameChange = useCallback(e => dispatch(changeName(e.target.value)), [dispatch]);
    const onPhoneNumberChange = useCallback(e => dispatch(changePhoneNumber(e.target.value)), [dispatch]);
    const onPasswordChange = useCallback(e => dispatch(changePassword(e.target.value)), [dispatch]);

    const onModifyClick = () => {
        dispatch(modifyPersonalInformation({
            token,
            name,
            phoneNumber
        }));
    };
    const onOpenClick = () => {
        setOpen(true);
    };
    const onYesClick = () => {
        dispatch(withdraw({
            token,
            password
        }));
    };
    const onNoClick = () => {
        setOpen(false);

        dispatch(modifyPersonalInformationInitialize());
    };
    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (withdrawSuccess) {
            navigate(process.env.REACT_APP_SETTING_PATH);
        }

        return () => {
            if (!withdrawSuccess) {
                dispatch(modifyPersonalInformationInitialize());
            }
        };
    }, [withdrawSuccess, navigate, dispatch]);

    return (
        <SettingPersonalInformationComponent
            name={name}
            phoneNumber={phoneNumber}
            password={password}
            open={open}
            onNameChange={onNameChange}
            onPhoneNumberChange={onPhoneNumberChange}
            onPasswordChange={onPasswordChange}
            onModifyClick={onModifyClick}
            onOpenClick={onOpenClick}
            onYesClick={onYesClick}
            onNoClick={onNoClick}
            goBack={goBack}
        />
    );
};

export default React.memo(SettingPersonalInformation);