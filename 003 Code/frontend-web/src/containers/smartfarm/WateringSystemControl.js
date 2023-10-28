import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WateringSystemControlComponent from '../../components/smartfarm/WateringSystemControl';
import { changeWork, changeWorkTime, changeAutoWork, changeAutoWorkPeriod } from '../../modules/smartfarm/wateringSystemControl';

const WateringSystemControl = () => {
    const remoteControl = useSelector(state => state.smartfarm.remoteControl);
    const wateringSystemControl = useSelector(state => state.wateringSystemControl);

    const dispatch = useDispatch();

    const onWorkChange = useCallback(() => {
        dispatch(changeWork());
    }, [dispatch]);
    const onWorkTimeChange = useCallback(e => {
        dispatch(changeWorkTime(e.target.value));
    }, [dispatch]);
    const onAutoWorkChange = useCallback(e => {
        dispatch(changeAutoWork(e.target.checked));
    }, [dispatch]);
    const onAutoWorkPeriodChange = useCallback(e => {
        dispatch(changeAutoWorkPeriod(e.target.value));
    }, [dispatch]);

    return (
        <WateringSystemControlComponent
            remoteControl={remoteControl}
            wateringSystemControl={wateringSystemControl}
            onWorkChange={onWorkChange}
            onWorkTimeChange={onWorkTimeChange}
            onAutoWorkChange={onAutoWorkChange}
            onAutoWorkPeriodChange={onAutoWorkPeriodChange}
        />
    );
};

export default React.memo(WateringSystemControl);