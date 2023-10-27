import { MenuItem, Stack, Typography } from '@mui/material';
import SelectAutoWidth from './SelectAutoWidth';

const TypographyWithTimeNumberPicker = ({ disabled, period, onPeriodChange, time, text, sx }) => {
    const periodNumbers = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24
    ];

    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent='center'
            sx={sx}
        >
            <SelectAutoWidth
                disabled={disabled}
                value={period}
                onChange={onPeriodChange}
            >
                {periodNumbers.map((periodNumber, index) => <MenuItem key={index} value={periodNumber}>{periodNumber}</MenuItem>)}
            </SelectAutoWidth>
            <Typography variant='h6'>시간 마다 {time}초 동안 {text}</Typography>
        </Stack>
    );
};

export default TypographyWithTimeNumberPicker;