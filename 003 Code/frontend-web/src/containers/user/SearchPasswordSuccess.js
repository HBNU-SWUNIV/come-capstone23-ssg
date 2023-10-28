import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SearchPasswordSuccessComponent from '../../components/user/SearchPasswordSuccess';
import { changePassword } from '../../modules/user/user';

const SearchPasswordSuccess = () => {
    const password = useSelector(state => state.user.password);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goLogIn = () => {
        navigate(process.env.REACT_APP_LOGIN_PATH);
        dispatch(changePassword(''));
    };

    useEffect(() => {
        return () => dispatch(changePassword(''));
    }, [dispatch]);

    return (
        <SearchPasswordSuccessComponent password={password} goLogIn={goLogIn}/>
    );
};

export default React.memo(SearchPasswordSuccess);