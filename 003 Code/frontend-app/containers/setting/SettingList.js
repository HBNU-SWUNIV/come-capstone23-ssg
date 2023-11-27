import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SettingListComponent from '../../components/setting/SettingList';
import { logout } from '../../slices/user/user';

function SettingList() {
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const goRegisterSmartfarm = () => {
        navigation.navigate('RegisterSmartfarm');
    };

    const goRegisterPlant = () => {
        navigation.navigate('RegisterPlant');
    };

    const onLogOut = () => {dispatch(logout())};

    return (
        <SettingListComponent
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            goRegisterSmartfarm={goRegisterSmartfarm}
            goRegisterPlant={goRegisterPlant}
            onLogOut={onLogOut}
        />
    );
}

export default React.memo(SettingList);