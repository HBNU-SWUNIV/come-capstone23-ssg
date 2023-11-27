import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeComonent from '../../components/smartfarm/Home';
import { removePlant } from '../../modules/smartfarm/plant';

const Home = () => {
    const token = useSelector(state => state.user.token);
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);
    const plantName = useSelector(state => state.plant.name);
    const day = useSelector(state => state.plant.day);
    const temperature = useSelector(state => state.smartfarm.temperature);
    const humidity = useSelector(state => state.smartfarm.humidity);
    const waterTemperature = useSelector(state => state.smartfarm.waterTemperature);
    const waterLevel = useSelector(state => state.smartfarm.waterLevel);
    const ndvi = useSelector(state => state.plant.ndvi);
    const ledStatus = useSelector(state => state.ledControl.status);
    const wateringSystemStatus = useSelector(state => state.wateringSystemControl.status);
    const fanStatus = useSelector(state => state.fanControl.status);
    const centerDoorStatus = useSelector(state => state.centerDoorControl.status);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goRegisterSmartfarm = () => {
        navigate(process.env.REACT_APP_REGISTER_SMARTFARM_PATH);
    };
    const goRegisterPlant = () => {
        navigate(process.env.REACT_APP_REGISTER_PLANT_PATH);
    };

    const onHarvest = () => {
        dispatch(removePlant(token));
    }

    return (
        <HomeComonent
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            plantName={plantName}
            day={day}
            temperature={temperature}
            humidity={humidity}
            waterTemperature={waterTemperature}
            waterLevel={waterLevel}
            ndvi={ndvi}
            ledStatus={ledStatus}
            wateringSystemStatus={wateringSystemStatus}
            fanStatus={fanStatus}
            centerDoorStatus={centerDoorStatus}
            goRegisterSmartfarm={goRegisterSmartfarm}
            goRegisterPlant={goRegisterPlant}
            onHarvest={onHarvest}
        />
    );
};

export default React.memo(Home);