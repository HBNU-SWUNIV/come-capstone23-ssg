import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SettingListComponent from '../../components/setting/SettingList';

function SettingList() {
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);

    const navigation = useNavigation();

    const goRegisterSmartfarm = () => {
        navigation.navigate('RegisterSmartfarm');
    };

    const goRegisterPlant = () => {
        navigation.navigate('RegisterPlant');
    };

    return (
        <SettingListComponent
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            goRegisterSmartfarm={goRegisterSmartfarm}
            goRegisterPlant={goRegisterPlant}
        />
    );
}

export default React.memo(SettingList);