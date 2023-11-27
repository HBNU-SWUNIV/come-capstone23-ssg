import React, { useState } from 'react';
import TextWithPeriodPickerComponent from '../../components/common/TextWithPeriodPicker';

function TextWithPeriodPicker({
    name,
    period,
    periodNumbers,
    workTime,
    disabled,
    onChange
}) {
    const [index, setIndex] = useState(0);

    const onIndexChange = (index) => {
        setIndex(index);
        onChange(periodNumbers[index]);
    };

    return (
        <TextWithPeriodPickerComponent
            name={name}
            index={index}
            workTime={workTime}
            periodNumbers={periodNumbers}
            disabled={disabled}
            onChange={onIndexChange}
        />
    );
}

export default React.memo(TextWithPeriodPicker);