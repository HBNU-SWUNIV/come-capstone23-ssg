import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SignUpComponent from '../../components/user/SignUp';
import {
    changeName,
    changeId,
    changePassword,
    changePasswordCheck,
    signupInitialize,
    signup
} from '../../slices/user/user';

function SignUp() {
    const name = useSelector(state => state.user.name);
    const id = useSelector(state => state.user.id);
    const password = useSelector(state => state.user.password);
    const passwordCheck = useSelector(state => state.user.passwordCheck);
    const signupSuccess = useSelector(state => state.user.signupSuccess);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onNameChange = useCallback(e => dispatch(changeName(e)), [dispatch]);
    const onIdChange = useCallback(e => dispatch(changeId(e)), [dispatch]);
    const onPasswordChange = useCallback(e => (dispatch(changePassword(e))), [dispatch]);
    const onPasswordCheckChange = useCallback(e => (dispatch(changePasswordCheck(e))), [dispatch]);

    const clear = () => {dispatch(signupInitialize())};

    const onSignUp = () => {dispatch(signup({
        id,
        password,
        passwordCheck,
        name
    }))};

    const goBack = () => {
        navigation.popToTop();
        clear();
    };

    useEffect(() => {
        if (signupSuccess) {
            navigation.popToTop();
            navigation.replace('SignUpSuccess');
            clear();
        }
    }, [signupSuccess, navigation, clear]);

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
            onSignUp={onSignUp}
            goBack={goBack}
        />
    );
}

export default React.memo(SignUp);