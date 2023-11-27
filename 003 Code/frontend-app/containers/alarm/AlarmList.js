import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getSmartfarmAlarmList } from '../../assets/api/webApi';
import { showSnackbar } from '../../slices/common';
import AlarmListComponent from '../../components/alarm/AlarmList';

function AlarmList() {
    const token = useSelector(state => state.user.token);
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);
    const [smartfarmAlarm, setSmartfarmAlarm] = useState(null);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const goRegisterSmartfarm = () => {
        navigation.navigate('RegisterSmartfarm');
    };

    const goRegisterPlant = () => {
        navigation.navigate('RegisterPlant');
    };

    useEffect(() => {
        async function getAlarmList() {
            try {
                const response = await getSmartfarmAlarmList(token);

                setSmartfarmAlarm(response.data);
            } catch (e) {
                dispatch(showSnackbar(e.response.data?.message === undefined ? '잠시 후 시도해주세요' : e.response.data.message));
            }
        }
        getAlarmList();
    }, [dispatch, token]);

    return (
        <AlarmListComponent
            existSmartfarm={existSmartfarm}
            existPlant={existPlant}
            smartfarmAlarm={smartfarmAlarm}
            goRegisterSmartfarm={goRegisterSmartfarm}
            goRegisterPlant={goRegisterPlant}
        />
    );
}

export default React.memo(AlarmList);