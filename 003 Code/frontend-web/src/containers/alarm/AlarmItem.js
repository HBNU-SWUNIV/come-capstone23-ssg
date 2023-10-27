import React, { useState } from 'react';
import AlarmItemComponent from '../../components/alarm/AlarmItem';

const AlarmItem = ({ alarm }) => {
    const [open, setOpen] = useState(false);

    const onOpenClick = () => {
        setOpen(true);
    };
    const onYesClick = () => {
        setOpen(false);
        console.log('SERVER: 해당 알람 삭제 요청');
    };
    const onNoClick = () => {
        setOpen(false);
    };

    return (
        <AlarmItemComponent
            alarm={alarm}
            open={open}
            onOpenClick={onOpenClick}
            onYesClick={onYesClick}
            onNoClick={onNoClick}
        />
    );
};

export default React.memo(AlarmItem);