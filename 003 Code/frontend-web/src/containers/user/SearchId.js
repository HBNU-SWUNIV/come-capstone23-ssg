import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchIdComponent from '../../components/user/SearchId';
import { changeName, changePhoneNumber, searchIdInitialize, searchId } from '../../modules/user/user';

const SearchId = () => {
    const name = useSelector(state => state.user.name);
    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const searchIdSuccess = useSelector(state => state.user.searchIdSuccess);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNameChange = useCallback(e => dispatch(changeName(e.target.value)), [dispatch]);
    const onPhoneNumberChange = useCallback(e => dispatch(changePhoneNumber(e.target.value)), [dispatch]);

    const goBack = () => {
        navigate(-1);
    };
    const goNext = () => {
        dispatch(searchId({
            name,
            phoneNumber
        }));
    };

    useEffect(() => {
        if (searchIdSuccess) {
            navigate(process.env.REACT_APP_SEARCH_ID_SUCCESS_PATH);
        } else if (searchIdSuccess === null) {} else {
            navigate(process.env.REACT_APP_SEARCH_ID_FAILURE_PATH);
        }

        return () => dispatch(searchIdInitialize());
    }, [searchIdSuccess, navigate, dispatch]);

    return (
        <SearchIdComponent
            name={name}
            phoneNumber={phoneNumber}
            onNameChange={onNameChange}
            onPhoneNumberChange={onPhoneNumberChange}
            goBack={goBack}
            goNext={goNext}
        />
    );
};

export default React.memo(SearchId);