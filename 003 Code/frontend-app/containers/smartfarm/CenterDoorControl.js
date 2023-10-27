import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CenterDoorControlComponent from '../../components/smartfarm/CenterDoorControl';
import {
    changeWork,
    changeAutoWork,
    changeAutoWorkStartDayNight,
    changeAutoWorkStartHour,
    changeAutoWorkStartMinute,
    changeAutoWorkEndDayNight,
    changeAutoWorkEndHour,
    changeAutoWorkEndMinute
} from '../../slices/smartfarm/centerDoorControl';

function CenterDoorControl() {
    const remoteControl = useSelector(state => state.smartfarm.remoteControl);
    const centerDoorControl = useSelector(state => state.centerDoorControl);

    const dispatch = useDispatch();

    const onWorkChange = useCallback(() => dispatch(changeWork()), [dispatch]);
    const onAutoWorkChange = useCallback(() => dispatch(changeAutoWork()), [dispatch]);
    const onAutoWorkStartDayNightChange = useCallback(e => dispatch(changeAutoWorkStartDayNight(e)), [dispatch]);
    const onAutoWorkStartHourChange = useCallback(e => dispatch(changeAutoWorkStartHour(e)), [dispatch]);
    const onAutoWorkStartMinutChange = useCallback(e => dispatch(changeAutoWorkStartMinute(e)), [dispatch]);
    const onAutoWorkEndDayNightChange = useCallback(e => dispatch(changeAutoWorkEndDayNight(e)), [dispatch]);
    const onAutoWorkEndHourChange = useCallback(e => dispatch(changeAutoWorkEndHour(e)), [dispatch]);
    const onAutoWorkEndMinutChange = useCallback(e => dispatch(changeAutoWorkEndMinute(e)), [dispatch]);

    return (
        <CenterDoorControlComponent
            remoteControl={remoteControl}
            centerDoorControl={centerDoorControl}
            onWorkChange={onWorkChange}
            onAutoWorkChange={onAutoWorkChange}
            onAutoWorkStartDayNightChange={onAutoWorkStartDayNightChange}
            onAutoWorkStartHourChange={onAutoWorkStartHourChange}
            onAutoWorkStartMinutChange={onAutoWorkStartMinutChange}
            onAutoWorkEndDayNightChange={onAutoWorkEndDayNightChange}
            onAutoWorkEndHourChange={onAutoWorkEndHourChange}
            onAutoWorkEndMinutChange={onAutoWorkEndMinutChange}
        />
    );
}

export default React.memo(CenterDoorControl);