import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignUpComponent from '../../components/user/SignUp';
import { changeName, changeId, changePassword, changePasswordCheck, signupInitialize, signup } from '../../modules/user/user';

const SignUp = () => {
    const name = useSelector(state => state.user.name);
    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const id = useSelector(state => state.user.id);
    const password = useSelector(state => state.user.password);
    const passwordCheck = useSelector(state => state.user.passwordCheck);
    const signupSuccess = useSelector(state => state.user.signupSuccess);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNameChange = useCallback(e => dispatch(changeName(e.target.value)), [dispatch]);
    const onIdChange = useCallback(e => dispatch(changeId(e.target.value)), [dispatch]);
    const onPasswordChange = useCallback(e => dispatch(changePassword(e.target.value)), [dispatch]);
    const onPasswordCheckChange = useCallback(e => dispatch(changePasswordCheck(e.target.value)), [dispatch]);

    const onSignUpSuccessClick = () => {
        dispatch(signup({
            name,
            phoneNumber,
            id,
            password
        }));
    };
    const goBack = () => {
        dispatch(signupInitialize());
        navigate(process.env.REACT_APP_LOGIN_PATH);
    };

    useEffect(() => {
        if (signupSuccess) {
            navigate(process.env.REACT_APP_SIGNUP_SUCCESS_PATH);
        }
        
        return () => dispatch(signupInitialize());
    }, [signupSuccess, navigate, dispatch]);

    return (
        <SignUpComponent
            name={name}
            id={id}
            password={password}
            passwordCheck={passwordCheck}
            onNameChange={onNameChange}
            onIdChange={onIdChange}
            onPasswordChange={onPasswordChange}
            onPasswordCheckChange={onPasswordCheckChange}
            onSignUpSuccessClick={onSignUpSuccessClick}
            goBack={goBack}
        />
    );
};

export default React.memo(SignUp);