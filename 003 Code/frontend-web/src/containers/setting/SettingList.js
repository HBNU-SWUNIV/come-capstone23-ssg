import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingListComponent from '../../components/setting/SettingList';

const SettingList = () => {
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);

    const navigate = useNavigate();

    const goRegisterSmartfarm = () => {
        navigate(process.env.REACT_APP_REGISTER_SMARTFARM_PATH);
    };
    const goRegisterPlant = () => {
        navigate(process.env.REACT_APP_REGISTER_PLANT_PATH);
    };

    return (
        <SettingListComponent
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            goRegisterSmartfarm={goRegisterSmartfarm}
            goRegisterPlant={goRegisterPlant}
        />
    );
};

export default React.memo(SettingList);