import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VerifyComponent from '../../components/user/Verify';
import { changeName, changePhoneNumber } from '../../modules/user/user';

const Verify = () => {
    const name = useSelector(state => state.user.name);
    const phoneNumber = useSelector(state => state.user.phoneNumber);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNameChange = useCallback(e => dispatch(changeName(e.target.value)), [dispatch]);
    const onPhoneNumberChange = useCallback(e => dispatch(changePhoneNumber(e.target.value)), [dispatch]);

    const goBack = () => {
        navigate(process.env.REACT_APP_LOGIN_PATH);
    };
    const goSignUp = () => {
        navigate(process.env.REACT_APP_SIGNUP_PATH);
    };

    return (
        <VerifyComponent
            name={name}
            phoneNumber={phoneNumber}
            onNameChange={onNameChange}
            onPhoneNumberChange={onPhoneNumberChange}
            goBack={goBack}
            goSignUp={goSignUp}
        />
    );
};

export default React.memo(Verify);