import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import RegisterSmartfarmComponent from '../../components/smartfarm/RegisterSmartfarm';
import { changeSmartfarmNumber, registerSmartfarmInitialize, checkSmartfarmNumber, registerSmartfarm } from '../../slices/smartfarm/smartfarm';

function RegisterSmartfarm() {
    const token = useSelector(state => state.user.token);
    const smartfarmNumber = useSelector(state => state.smartfarm.smartfarmNumber);
    const checkSmartfarmNumberSuccess = useSelector(state => state.smartfarm.checkSmartfarmNumberSuccess);
    const registerSmartfarmSuccess = useSelector(state => state.smartfarm.registerSmartfarmSuccess);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onSmartfarmNumberChange = useCallback(e => dispatch(changeSmartfarmNumber(e)), [dispatch]);

    const clear = () => {dispatch(registerSmartfarmInitialize())};

    const onCheckSmartfarmNumber = () => {
        dispatch(checkSmartfarmNumber(smartfarmNumber));
    };

    const onRegisterSmartfarm = () => {
        dispatch(registerSmartfarm({
            token,
            smartfarmNumber
        }));
    };

    const goBack = () => {
        navigation.pop();
        clear();
    };

    useEffect(() => {
        if (registerSmartfarmSuccess) {
            navigation.replace('RegisterSmartfarmSuccess');
            clear();
        }
    }, [registerSmartfarmSuccess, navigation, clear]);

    return (
        <RegisterSmartfarmComponent
            smartfarmNumber={smartfarmNumber}
            checkSmartfarmNumberSuccess={checkSmartfarmNumberSuccess}
            onSmartfarmNumberChange={onSmartfarmNumberChange}
            onCheckSmartfarmNumber={onCheckSmartfarmNumber}
            onRegisterSmartfarm={onRegisterSmartfarm}
            goBack={goBack}
        />
    );
}

export default React.memo(RegisterSmartfarm);