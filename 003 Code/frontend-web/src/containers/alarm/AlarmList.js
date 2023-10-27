import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AlarmListComponent from '../../components/alarm/AlarmList';

const AlarmList = () => {
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);

    const navigate = useNavigate();

    const goRegisterSmartfarm = () => {
        navigate(process.env.REACT_APP_REGISTER_SMARTFARM_PATH);
    };
    const goRegisterPlant = () => {
        navigate(process.env.REACT_APP_REGISTER_SMARTFARM_PATH);
    };

    return (
        <AlarmListComponent
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            goRegisterSmartfarm={goRegisterSmartfarm}
            goRegisterPlant={goRegisterPlant}
        />
    );
};

export default React.memo(AlarmList);