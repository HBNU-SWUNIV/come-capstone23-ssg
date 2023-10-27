import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchIdSuccessComponent from '../../components/user/SearchIdSuccess';

const SearchIdSuccess = () => {
    const id = useSelector(state => state.user.id);

    const navigate = useNavigate();

    const goSearchPassword = () => {
        navigate(process.env.REACT_APP_SEARCH_PASSWORD_PATH);
    };
    const goLogIn = () => {
        navigate(process.env.REACT_APP_LOGIN_PATH);
    };

    return (
        <SearchIdSuccessComponent
            id={id}
            goSearchPassword={goSearchPassword}
            goLogIn={goLogIn}
        />
    );
};

export default React.memo(SearchIdSuccess);