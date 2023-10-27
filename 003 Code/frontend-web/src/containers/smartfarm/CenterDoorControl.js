import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CenterDoorControlComponent from '../../components/smartfarm/CenterDoorControl';
import { changeWork, changeAutoWork, changeAutoWorkStartTime, changeAutoWorkEndTime } from '../../modules/smartfarm/centerDoorControl';

const CenterDoorControl = () => {
    const remoteControl = useSelector(state => state.smartfarm.remoteControl);
    const centerDoorControl = useSelector(state => state.centerDoorControl);

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
        <CenterDoorControlComponent
            remoteControl={remoteControl}
            centerDoorControl={centerDoorControl}
            onWorkChange={onWorkChange}
            onAutoWorkChange={onAutoWorkChange}
            onAutoWorkStartTimeChange={onAutoWorkStartTimeChange}
            onAutoWorkEndTimeChange={onAutoWorkEndTimeChange}
        />
    );
};

export default React.memo(CenterDoorControl);