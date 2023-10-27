import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ControlAppBarComponent from '../../components/smartfarm/ControlAppBar';
import { changeRemoteControl } from '../../modules/smartfarm/smartfarm';

const ControlAppBar = ({ text }) => {
    const remoteControl = useSelector(state => state.smartfarm.remoteControl);

    const dispatch = useDispatch();

    const onRemoteControlChange = useCallback(e => dispatch(changeRemoteControl(e.target.checked)), [dispatch]);

    return (
        <ControlAppBarComponent
            text={text}
            remoteControl={remoteControl}
            onRemoteControlChange={onRemoteControlChange}
        />
    );
};

export default React.memo(ControlAppBar);