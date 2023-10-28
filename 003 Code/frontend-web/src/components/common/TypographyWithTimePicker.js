import { ThemeProvider, createTheme, Stack, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const theme = createTheme({
    components: {
        MuiTimePicker: {
            styleOverrides: {
                root: {
                    color: 'info'
                },
            },
        },
    },
});

const TypographyWithTimePicker = ({ text, disabled, value, onChange, sx }) => {

    return (
        <Stack
			direction='row'
			alignItems='center'
			justifyContent='space-between'
            sx={sx}
		>
            <Typography variant='h6'>{text}</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                    <ThemeProvider theme={theme}>
                        <TimePicker
                            disabled={disabled}
                            value={value}
                            onChange={onChange}
                            sx={{ width: 60 }}
                        />
                    </ThemeProvider>
                </DemoContainer>
            </LocalizationProvider>
        </Stack>
    );
};

export default TypographyWithTimePicker;