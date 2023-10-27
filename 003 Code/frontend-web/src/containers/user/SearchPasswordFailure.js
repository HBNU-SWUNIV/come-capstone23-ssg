import React from "react";
import { useNavigate } from "react-router-dom";
import SearchPasswordFailureComponent from '../../components/user/SearchPasswordFailure';

const SearchPasswordFailure = () => {
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
        <SearchPasswordFailureComponent
            goSearchId={goSearchId}
            goSearchPassword={goSearchPassword}
            goLogIn={goLogIn}
        />
    );
};

export default React.memo(SearchPasswordFailure);