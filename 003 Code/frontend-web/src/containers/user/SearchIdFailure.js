import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIdFailureComponent from '../../components/user/SearchIdFailure';

const SearchIdFailure = () => {
    const navigate = useNavigate();

    const goSearchId = () => {
        navigate(process.env.REACT_APP_SEARCH_ID_PATH);
    };
    const goSearchPassword = () => {
        navigate(process.env.REACT_APP_SEARCH_PASSWORD_PATH);
    };
    const goLogIn = () => {
        navigate(process.env.REACT_APP_LOGIN_PATH);
    };

    return (
        <SearchIdFailureComponent
            goSearchId={goSearchId}
            goSearchPassword={goSearchPassword}
            goLogIn={goLogIn}
        />
    );
};

export default React.memo(SearchIdFailure);