import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchPasswordComponent from '../../components/user/SearchPassword';
import { changeName, changeId, changePhoneNumber, searchPasswordInitialize, searchPassword } from '../../modules/user/user';

const SearchPassword = () => {
    const name = useSelector(state => state.user.name);
    const id = useSelector(state => state.user.id);
    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const searchPasswordSuccess = useSelector(state => state.user.searchPasswordSuccess);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNameChange = useCallback(e => dispatch(changeName(e.target.value)), [dispatch]);
    const onIdChange= useCallback(e => dispatch(changeId(e.target.value)), [dispatch]);
    const onPhoneNumberChange = useCallback(e => dispatch(changePhoneNumber(e.target.value)), [dispatch]);

    const goBack = () => {
        navigate(-1);
    };
    const goNext = () => {
        dispatch(searchPassword({
            name,
            phoneNumber,
            id
        }));
    };

    useEffect(() => {
        if (searchPasswordSuccess) {
            navigate(process.env.REACT_APP_SEARCH_PASSWORD_SUCCESS_PATH);
        } else if (searchPasswordSuccess === null) {} else {
            navigate(process.env.REACT_APP_SEARCH_PASSWORD_FAILURE_PATH);
        }

        return () => dispatch(searchPasswordInitialize());
    }, [searchPasswordSuccess, navigate, dispatch]);

    return (
        <SearchPasswordComponent
            name={name}
            id={id}
            phoneNumber={phoneNumber}
            onNameChange={onNameChange}
            onIdChange={onIdChange}
            onPhoneNumberChange={onPhoneNumberChange}
            goBack={goBack}
            goNext={goNext}
        />
    );
};

export default React.memo(SearchPassword);