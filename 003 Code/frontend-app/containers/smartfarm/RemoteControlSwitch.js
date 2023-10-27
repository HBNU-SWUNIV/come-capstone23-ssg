import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RemoteControlSwitchComponent from '../../components/smartfarm/RemoteControlSwitch';
import { changeRemoteControl } from '../../slices/smartfarm/smartfarm';

function RemoteControlSwitch() {
    const remoteControl = useSelector(state => state.smartfarm.remoteControl);

    const dispatch = useDispatch();

    const onRemoteControlChange = useCallback(() => dispatch(changeRemoteControl()), [dispatch]);

    return (
        <RemoteControlSwitchComponent
            value={remoteControl}
            onChange={onRemoteControlChange}
        />
    );
}

export default React.memo(RemoteControlSwitch);