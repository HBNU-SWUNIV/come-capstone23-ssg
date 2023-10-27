import React, { useCallback} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SettingAlarmComponent from '../../components/setting/SettingAlarm';
import {
    changeModifyPersonalInformation,
    changeLogInOut,
    changeModifySmartfarm,
    changeAutoControlSmartfarm,
    changeWarnSmartfarm,
    changeModifyPlant,
    changeHarvestPlant
} from '../../slices/setting/settingAlarm';

function SettingAlarm() {
    const settingAlarm = useSelector(state => state.settingAlarm);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onModifyPersonalInformationChange = useCallback(() => dispatch(changeModifyPersonalInformation()), [dispatch]);
    const onLogInOutChange = useCallback(() => dispatch(changeLogInOut()), [dispatch]);
    const onModifySmartfarmChange = useCallback(() => dispatch(changeModifySmartfarm()), [dispatch]);
    const onAutoControlSmartfarmChange= useCallback(() => dispatch(changeAutoControlSmartfarm()), [dispatch]);
    const onWarnSmartfarmChange = useCallback(() => dispatch(changeWarnSmartfarm()), [dispatch]);
    const onModifyPlantChange = useCallback(() => dispatch(changeModifyPlant()), [dispatch]);
    const onHarvestPlantChange = useCallback(() => dispatch(changeHarvestPlant()), [dispatch]);

    const goRegisterSmartfarm = () => {
        navigation.navigate('RegisterSmartfarm');
    };

    const goRegisterPlant = () => {
        navigation.navigate('RegisterPlant');
    };

    return (
        <SettingAlarmComponent
            settingAlarm={settingAlarm}
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
}

export default React.memo(SettingAlarm);