import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SearchPasswordComponent from '../../components/user/SearchPassword';
import {
    changeName,
    changeId,
    changePhoneNumber,
    searchPasswordInitialize,
    searchPassword
} from '../../slices/user/user';

function SearchPassword() {
    const name = useSelector(state => state.user.name);
    const id = useSelector(state => state.user.id);
    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const searchPasswordSuccess = useSelector(state => state.user.searchPasswordSuccess);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onNameChange = useCallback(e => dispatch(changeName(e)), [dispatch]);
    const onIdChange = useCallback(e => dispatch(changeId(e)), [dispatch]);
    const onPhoneNumberChange = useCallback(e => (dispatch(changePhoneNumber(e))), [dispatch]);

    const clear = () => {dispatch(searchPasswordInitialize())};

    const goNext = () => {
        dispatch(searchPassword({
            name,
            phoneNumber,
            id
        }));
        clear();
    };

    const goBack = () => {
        navigation.pop();
        clear();
    };

    useEffect(() => {
        if (searchPasswordSuccess) {
            navigation('SearchPasswordSuccess');
            clear();
        } else if (searchPasswordSuccess === null) {} else {
            navigation('SearchPasswordFailure');
            clear();
        }
    }, [searchPasswordSuccess, navigation, clear]);

    return (
        <SearchPasswordComponent
            name={name}
            id={id}
            phoneNumber={phoneNumber}
            onNameChange={onNameChange}
            onIdChange={onIdChange}
            onPhoneNumberChange={onPhoneNumberChange}
            goNext={goNext}
            goBack={goBack}
        />
    );
}

export default React.memo(SearchPassword);