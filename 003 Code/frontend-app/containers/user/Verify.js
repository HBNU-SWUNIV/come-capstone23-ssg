import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import VerifyComponent from '../../components/user/Verify';
import { changeName, changePhoneNumber, searchIdInitialize, searchId } from '../../slices/user/user';

function Verify() {
    const name = useSelector(state => state.user.name);
    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const searchIdSuccess = useSelector(state => state.user.searchIdSuccess);

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const onNameChange = useCallback(e => dispatch(changeName(e)), [dispatch]);
    const onPhoneNumberChange = useCallback(e => dispatch(changePhoneNumber(e)), [dispatch]);

    const clear = () => {dispatch(searchIdInitialize())};

    const goNext = () => {
        if (route.name === 'Verify') {
            navigation.popToTop();
            navigation.navigate('SignUp');
        } else if (route.name === 'SearchId') {
            dispatch(searchId({
                name,
                phoneNumber
            }));
        }
    };

    const goBack = () => {
        navigation.pop();
        clear();
    };

    useEffect(() => {
        if (searchIdSuccess) {
            navigation('searchIdSuccess');
            clear();
        } else if (searchIdSuccess === null) {} else {
            navigation('searchIdFailure');
            clear();
        }
    }, [searchIdSuccess, navigation, clear]);

    return (
        <VerifyComponent
            name={name}
            phoneNumber={phoneNumber}
            onNameChange={onNameChange}
            onPhoneNumberChange={onPhoneNumberChange}
            goNext={goNext}
            goBack={goBack}
        />
    );
}

export default React.memo(Verify);