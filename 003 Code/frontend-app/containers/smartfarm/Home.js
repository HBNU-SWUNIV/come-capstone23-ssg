import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import HomeComponent from '../../components/smartfarm/Home';

function Home() {
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);
    const temperature = useSelector(state => state.smartfarm.temperature);
    const humidity = useSelector(state => state.smartfarm.humidity);
    const ledControlStatus = useSelector(state => state.ledControl.status);
    const wateringSystemControlStatus = useSelector(state => state.wateringSystemControl.status);
    const fanControlStatus = useSelector(state => state.fanControl.status);
    const centerDoorControlStatus = useSelector(state => state.centerDoorControl.status);

    const navigation = useNavigation();

    const goRegisterSmartfarm = () => {
        navigation.navigate('RegisterSmartfarm');
    };

    const goRegisterPlant = () => {
        navigation.navigate('RegisterPlant');
    };

    const goLedControl = () => {
        navigation.navigate('LedControl');
    };

    const goWateringSystemControl = () => {
        navigation.navigate('WateringSystemControl');
    };

    const goFanControl = () => {
        navigation.navigate('FanControl');
    };

    const goCenterDoorControl = () => {
        navigation.navigate('CenterDoorControl');
    };

    return (
        <HomeComponent
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            temperature={temperature}
            humidity={humidity}
            ledControlStatus={ledControlStatus}
            wateringSystemControlStatus={wateringSystemControlStatus}
            fanControlStatus={fanControlStatus}
            centerDoorControlStatus={centerDoorControlStatus}
            goRegisterSmartfarm={goRegisterSmartfarm}
            goRegisterPlant={goRegisterPlant}
            goLedControl={goLedControl}
            goWateringSystemControl={goWateringSystemControl}
            goFanControl={goFanControl}
            goCenterDoorControl={goCenterDoorControl}
        />
    );
}

export default React.memo(Home);