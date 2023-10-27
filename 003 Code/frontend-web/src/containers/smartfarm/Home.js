import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeComonent from '../../components/smartfarm/Home';

const Home = () => {
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);
    const temperature = useSelector(state => state.smartfarm.temperature);
    const humidity = useSelector(state => state.smartfarm.humidity);
    const ledStatus = useSelector(state => state.ledControl.status);
    const wateringSystemStatus = useSelector(state => state.wateringSystemControl.status);
    const fanStatus = useSelector(state => state.fanControl.status);
    const centerDoorStatus = useSelector(state => state.centerDoorControl.status);

    const navigate = useNavigate();

    const goRegisterSmartfarm = () => {
        navigate(process.env.REACT_APP_REGISTER_SMARTFARM_PATH);
    };
    const goRegisterPlant = () => {
        navigate(process.env.REACT_APP_REGISTER_PLANT_PATH);
    };

    return (
        <HomeComonent
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            temperature={temperature}
            humidity={humidity}
            ledStatus={ledStatus}
            wateringSystemStatus={wateringSystemStatus}
            fanStatus={fanStatus}
            centerDoorStatus={centerDoorStatus}
            goRegisterSmartfarm={goRegisterSmartfarm}
            goRegisterPlant={goRegisterPlant}
        />
    );
};

export default React.memo(Home);