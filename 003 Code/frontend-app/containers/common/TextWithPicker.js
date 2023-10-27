import React, { useState } from 'react';
import TextWithPickerComponent from '../../components/common/TextWithPicker';

function TextWithPicker({ name }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onChange= (index) => {
        setSelectedIndex(index);
    };

    return (
        <TextWithPickerComponent
            name={name}
            selectedIndex={selectedIndex}
            onChange={onChange}
        />
    );
}

export default React.memo(TextWithPicker);