import { Stack, Typography, MenuItem } from '@mui/material';
import SelectAutoWidth from './SelectAutoWidth';

const TypographyWithNumberPicker = ({ text, disabled, value, onChange, numbers, sx }) => {
    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={sx}
        >
            <Typography variant='h6'>{text}</Typography>
            <SelectAutoWidth
                disabled={disabled}
                value={value}
                onChange={onChange}
            >
                {numbers.map((number, index) => <MenuItem key={index} value={number}>{number}</MenuItem>)}
            </SelectAutoWidth>
        </Stack>
    );
};

export default TypographyWithNumberPicker;