import React, {
    useCallback,
    useState,
    useEffect
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SettingPersonalInformationComponent from '../../components/setting/SettingPersonalInformation';
import {
    changeName,
    changePhoneNumber,
    changePassword,
    modifyPersonalInformationInitialize,
    modifyPersonalInformation,
    withdraw
} from '../../slices/user/user';

function SettingPersonalInformation() {
    const token = useSelector(state => state.user.token);
    const name = useSelector(state => state.user.name);
    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const password = useSelector(state => state.user.password);
    const withdrawSuccess = useSelector(state => state.user.withdrawSuccess);

    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onNameChange = useCallback(e => dispatch(changeName(e)));
    const onPhoneNumberChange = useCallback(e => dispatch(changePhoneNumber(e)));
    const onPasswordChange = useCallback(e => dispatch(changePassword(e)));

    const clear = () => {dispatch(modifyPersonalInformationInitialize())};

    const onModify = () => {
        dispatch(modifyPersonalInformation({
            token,
            name,
            phoneNumber
        }));
        navigation.popToTop();
    };

    const onOpen = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onOkay = () => {
        dispatch(withdraw({
            token,
            password
        }));
    };

    const goBack = () => {
        navigation.pop();
        clear();
    };

    useEffect(() => {
        if (withdrawSuccess) {
            setVisible(false);
            navigation.navigate('LogIn');
        }
    }, [withdrawSuccess, setVisible, navigation]);

    return (
        <SettingPersonalInformationComponent
            name={name}
            phoneNumber={phoneNumber}
            password={password}
            withdrawSuccess={withdrawSuccess}
            visible={visible}
            onNameChange={onNameChange}
            onPhoneNumberChange={onPhoneNumberChange}
            onPasswordChange={onPasswordChange}
            onModify={onModify}
            onOpen={onOpen}
            onClose={onClose}
            onOkay={onOkay}
            goBack={goBack}
        />
    );
}

export default React.memo(SettingPersonalInformation);