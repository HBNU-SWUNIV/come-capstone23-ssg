import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingAlarmComponent from '../../components/setting/SettingAlarm';
import { changeModifyPersonalInformation, changeLogInOut, changeModifySmartfarm, changeAutoControlSmartfarm, changeWarnSmartfarm, changeModifyPlant, changeHarvestPlant } from '../../modules/setting/settingAlarm';

const SettingAlarm = () => {
    const settingAlarm = useSelector(state => state.settingAlarm);
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onModifyPersonalInformationChange = useCallback(e => dispatch(changeModifyPersonalInformation(e.target.checked)), [dispatch]);
    const onLogInOutChange = useCallback(e => dispatch(changeLogInOut(e.target.checked)), [dispatch]);
    const onModifySmartfarmChange = useCallback(e => dispatch(changeModifySmartfarm(e.target.checked)), [dispatch]);
    const onAutoControlSmartfarmChange = useCallback(e => dispatch(changeAutoControlSmartfarm(e.target.checked)), [dispatch]);
    const onWarnSmartfarmChange = useCallback(e => dispatch(changeWarnSmartfarm(e.target.checked)), [dispatch]);
    const onModifyPlantChange = useCallback(e => dispatch(changeModifyPlant(e.target.checked)), [dispatch]);
    const onHarvestPlantChange = useCallback(e => dispatch(changeHarvestPlant(e.target.checked)), [dispatch]);

    const goRegisterSmartfarm = () => {
        navigate(process.env.REACT_APP_REGISTER_SMARTFARM_PATH);
    };
    const goRegisterPlant = () => {
        navigate(process.env.REACT_APP_REGISTER_PLANT_PATH);
    }

    return (
        <SettingAlarmComponent
            settingAlarm={settingAlarm}
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            onModifyPersonalInformationChange={onModifyPersonalInformationChange}
            onLogInOutChange={onLogInOutChange}
            onModifySmartfarmChange={onModifySmartfarmChange}
            onAutoControlSmartfarmChange={onAutoControlSmartfarmChange}
            onWarnSmartfarmChange={onWarnSmartfarmChange}
            onModifyPlantChange={onModifyPlantChange}
            onHarvestPlantChange={onHarvestPlantChange}
            goRegisterSmartfarm={goRegisterSmartfarm}
            goRegisterPlant={goRegisterPlant}
        />
    );
};

export default React.memo(SettingAlarm);