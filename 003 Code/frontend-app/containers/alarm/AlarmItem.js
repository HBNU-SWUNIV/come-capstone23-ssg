import React, { useState } from 'react';
import AlarmItemComponent from '../../components/alarm/AlarmItem';

function AlarmItem({ alarm }) {
    const [visible, setVisible] = useState(false);

    const onOpen = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onOkay = () => {
        console.log('해당 알람 삭제');
        setVisible(false);
    };

    return (
        <AlarmItemComponent
            alarm={alarm}
            visible={visible}
            onOpen={onOpen}
            onClose={onClose}
            onOkay={onOkay}
        />
    );
}

export default React.memo(AlarmItem);