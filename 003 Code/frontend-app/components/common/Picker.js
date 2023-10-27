import React from 'react';
import { useTheme } from 'react-native-paper';
import WheelPicker from 'react-native-wheely';

function Picker({
    style,
    selectedIndex,
    options,
    disabled,
    onChange
}) {
    const theme = useTheme();

    return (
        <WheelPicker
            containerStyle={style}
            itemTextStyle={{ color: disabled ? theme.colors.onSurfaceDisabled : '#000000' }}
            selectedIndicatorStyle={{ backgroundColor: disabled ? theme.colors.surfaceDisabled : theme.colors.picker }}
            selectedIndex={selectedIndex}
            options={options}
            onChange={onChange}
            visibleRest={1}
            flatListProps={{ scrollEnabled: !disabled }}
        />
    );
}

export default Picker;