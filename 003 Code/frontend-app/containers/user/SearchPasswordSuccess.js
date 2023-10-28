import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SearchPasswordSuccessComponent from '../../components/user/SearchPasswordSuccess';
import { changePassword } from '../../slices/user/user';

function SearchPasswordSuccess() {
    const password = useSelector(state => state.user.password);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const goLogIn = () => {
        navigation.popToTop();
        dispatch(changePassword(''));
    };

    return (
        <SearchPasswordSuccessComponent
            password={password}
            goLogIn={goLogIn}
        />
    );
}

export default React.memo(SearchPasswordSuccess);