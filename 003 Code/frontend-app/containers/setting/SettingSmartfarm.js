import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SettingSmartfarmComponent from '../../components/setting/SettingSmartfarm';
import {
    changeSmartfarmNumber,
    modifySmartfarmInitialize,
    removeSmartfarmInitialize,
    checkSmartfarmNumber,
    modifySmartfarm,
    removeSmartfarm
} from '../../slices/smartfarm/smartfarm';

function SettingSmartfarm() {
    const token = useSelector(state => state.user.token);
    const smartfarmNumber = useSelector(state => state.smartfarm.smartfarmNumber);
    const checkSmartfarmNumberSuccess = useSelector(state => state.smartfarm.checkSmartfarmNumberSuccess);
    const removeSmartfarmSuccess = useSelector(state => state.smartfarm.removeSmartfarmSuccess);

    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onSmartfarmNumberChange = useCallback(e => dispatch(changeSmartfarmNumber(e)), [dispatch]);

    const clear = () => {dispatch(modifySmartfarmInitialize())};

    const onCheckSmartfarmNumber = () => {
        dispatch(checkSmartfarmNumber(smartfarmNumber));
    };

    const onModify = () => {
        dispatch(modifySmartfarm({
            token,
            smartfarmNumber
        }));
    };

    const onOpen = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onOkay = () => {
        dispatch(removeSmartfarm(token));
        setVisible(false);
        navigation.replace('RemoveSmartfarmSuccess');
    };

    const goBack = () => {
        navigation.pop();
        clear();
    };

    useEffect(() => {
        if (removeSmartfarmSuccess) {
            setVisible(false);
            navigation.replace('RemoveSmartfarmSuccess');
            dispatch(removeSmartfarmInitialize());
        }
    }, [removeSmartfarmSuccess, setVisible, navigation, dispatch]);

    return (
        <SettingSmartfarmComponent
            smartfarmNumber={smartfarmNumber}
            checkSmartfarmNumberSuccess={checkSmartfarmNumberSuccess}
            visible={visible}
            onSmartfarmNumberChange={onSmartfarmNumberChange}
            onCheckSmartfarmNumber={onCheckSmartfarmNumber}
            onModify={onModify}
            onOpen={onOpen}
            onClose={onClose}
            onOkay={onOkay}
            goBack={goBack}
        />
    );
}

export default React.memo(SettingSmartfarm);