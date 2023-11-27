import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSmartfarmAlarmList } from '../../lib/api/webApi';
import AlarmListComponent from '../../components/alarm/AlarmList';
import { showSnackbar } from '../../modules/common';

const AlarmList = () => {
    const token = useSelector(state => state.user.token);
    const existSmartfarm = useSelector(state => state.smartfarm.exist);
    const existPlant = useSelector(state => state.plant.exist);
    const [smartfarmAlarm, setSmartfarmAlarm] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goRegisterSmartfarm = () => {
        navigate(process.env.REACT_APP_REGISTER_SMARTFARM_PATH);
    };
    const goRegisterPlant = () => {
        navigate(process.env.REACT_APP_REGISTER_SMARTFARM_PATH);
    };

    useEffect(() => {
        async function getAlarmList() {
            try{
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
};

export default React.memo(AlarmList);