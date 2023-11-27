import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import HomeComponent from '../../components/smartfarm/Home';
import { removePlant } from '../../slices/smartfarm/plant';

function Home() {
    const token = useSelector(state => state.user.token);
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);
    const name = useSelector(state => state.plant.name);
    const day = useSelector(state => state.plant.day);
    const temperature = useSelector(state => state.smartfarm.temperature);
    const humidity = useSelector(state => state.smartfarm.humidity);
    const waterTemperature = useSelector(state => state.smartfarm.waterTemperature);
    const waterLevel = useSelector(state => state.smartfarm.waterLevel);
    const ndvi = useSelector(state => state.plant.ndvi);
    const ledControlStatus = useSelector(state => state.ledControl.status);
    const wateringSystemControlStatus = useSelector(state => state.wateringSystemControl.status);
    const fanControlStatus = useSelector(state => state.fanControl.status);
    const centerDoorControlStatus = useSelector(state => state.centerDoorControl.status);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const goRegisterSmartfarm = () => {
        navigation.navigate('RegisterSmartfarm');
    };

    const goRegisterPlant = () => {
        navigation.navigate('RegisterPlant');
    };

    const goLedControl = () => {
        navigation.navigate('Smartfarm', { screen: 'LedControl' });
    };

    const goWateringSystemControl = () => {
        navigation.navigate('Smartfarm', { screen: 'WateringSystemControl' });
    };

    const goFanControl = () => {
        navigation.navigate('Smartfarm', { screen: 'FanControl' });
    };

    const goCenterDoorControl = () => {
        navigation.navigate('Smartfarm', { screen: 'CenterDoorControl' });
    };

    const onHarvest = () => {
        dispatch(removePlant(token));
    }

    return (
        <HomeComponent
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            name={name}
            day={day}
            temperature={temperature}
            humidity={humidity}
            waterTemperature={waterTemperature}
            waterLevel={waterLevel}
            ndvi={ndvi}
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
            onHarvest={onHarvest}
        />
    );
}

export default React.memo(Home);