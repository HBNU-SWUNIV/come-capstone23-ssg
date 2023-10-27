import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AlarmListComponent from '../../components/alarm/AlarmList';

function AlarmList() {
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
        <AlarmListComponent
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            goRegisterSmartfarm={goRegisterSmartfarm}
            goRegisterPlant={goRegisterPlant}
        />
    );
}

export default React.memo(AlarmList);