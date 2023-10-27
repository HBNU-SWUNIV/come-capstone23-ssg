import React from 'react';
import { useNavigation } from '@react-navigation/native';
import SearchFailureComponent from '../../components/user/SearchFailure';

function SearchFailure() {
    const navigation = useNavigation();

    const goSearchId = () => {
        navigation.popToTop();
        navigation.navigate('SearchId');
    };

    const goSearchPassword = () => {
        navigation.popToTop();
        navigation.navigate('SearchPassword');
    };

    const goLogIn = () => {
        navigation.popToTop();
    };

    return (
        <SearchFailureComponent
            goSearchId={goSearchId}
            goSearchPassword={goSearchPassword}
            goLogIn={goLogIn}
        />
    );
}

export default React.memo(SearchFailure);