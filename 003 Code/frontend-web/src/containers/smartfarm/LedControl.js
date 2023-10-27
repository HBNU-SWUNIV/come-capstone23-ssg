import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LedControlComponent from '../../components/smartfarm/LedControl';
import { changeWork, changeAutoWork, changeAutoWorkStartTime, changeAutoWorkEndTime } from '../../modules/smartfarm/ledControl';

const LedControl = () => {
    const remoteControl = useSelector(state => state.smartfarm.remoteControl);
    const ledControl = useSelector(state => state.ledControl);

    const dispatch = useDispatch();

    const onWorkChange = useCallback(() => {
        dispatch(changeWork());
    }, [dispatch]);
    const onAutoWorkChange = useCallback(e => {
        dispatch(changeAutoWork(e.target.checked));
    }, [dispatch]);
    const onAutoWorkStartTimeChange = useCallback(newStartTime => {
        dispatch(changeAutoWorkStartTime(newStartTime));
    }, [dispatch]);
    const onAutoWorkEndTimeChange = useCallback(newEndTime => {
        dispatch(changeAutoWorkEndTime(newEndTime));
    }, [dispatch]);

    return (
        <LedControlComponent
            remoteControl={remoteControl}
            ledControl={ledControl}
            onWorkChange={onWorkChange}
            onAutoWorkChange={onAutoWorkChange}
            onAutoWorkStartTimeChange={onAutoWorkStartTimeChange}
            onAutoWorkEndTimeChange={onAutoWorkEndTimeChange}
        />
    );
};

export default React.memo(LedControl);