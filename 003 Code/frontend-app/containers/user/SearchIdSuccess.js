import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SearchIdSuccessComponent from '../../components/user/SearchIdSuccess';

function SearchIdSuccess() {
    const id = useSelector(state => state.user.id);

    const navigation = useNavigation();

    const goSearchPassword = () => {
        navigation.popToTop();
        navigation.navigate('SearchPassword');
    };

    const goLogIn = () => {
        navigation.popToTop();
    };

    return (
        <SearchIdSuccessComponent
            id={id}
            goSearchPassword={goSearchPassword}
            goLogIn={goLogIn}
        />
    );
}

export default React.memo(SearchIdSuccess);