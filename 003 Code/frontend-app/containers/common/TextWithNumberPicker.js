import React, { useState } from 'react';
import TextWithNumberPickerComponent from '../../components/common/TextWithNumberPicker';

function TextWithNumberPicker({
    name,
    value,
    numbers,
    disabled,
    onChange
}) {
    const [index, setIndex] = useState(0);

    const onIndexChange = (index) => {
        setIndex(index);
        onChange(numbers[index]);
    };

    return (
        <TextWithNumberPickerComponent
            name={name}
            index={index}
            numbers={numbers}
            disabled={disabled}
            onChange={onIndexChange}
        />
    );
}

export default React.memo(TextWithNumberPicker);