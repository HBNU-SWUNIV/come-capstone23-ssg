import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FanControlComponent from '../../components/smartfarm/FanControl';
import { changeWork, changeAutoWork, changeAutoWorkStartTime, changeAutoWorkEndTime } from '../../modules/smartfarm/fanControl';

const FanControl = () => {
    const remoteControl = useSelector(state => state.smartfarm.remoteControl);
    const fanControl = useSelector(state => state.fanControl);

    const dispatch = useDispatch();

    const onWorkChange = useCallback(e => {
        dispatch(changeWork(e.target.checked));
    }, [dispatch]);
    const onAutoWorkChange = useCallback(e => {
        dispatch(changeAutoWork(e.target.checked));
    }, [dispatch]);
    const onAutoWorkStartTimeChange = useCallback(startTime => {
        dispatch(changeAutoWorkStartTime(startTime));
    }, [dispatch]);
    const onAutoWorkEndTimeChange = useCallback(endTime => {
        dispatch(changeAutoWorkEndTime(endTime));
    }, [dispatch]);

    return (
        <FanControlComponent
            remoteControl={remoteControl}
            fanControl={fanControl}
            onWorkChange={onWorkChange}
            onAutoWorkChange={onAutoWorkChange}
            onAutoWorkStartTimeChange={onAutoWorkStartTimeChange}
            onAutoWorkEndTimeChange={onAutoWorkEndTimeChange}
        />
    );
};

export default React.memo(FanControl);