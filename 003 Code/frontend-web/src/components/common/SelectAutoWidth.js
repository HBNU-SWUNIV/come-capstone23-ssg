import { ThemeProvider, createTheme, FormControl, Select } from '@mui/material';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 70,
        },
    },
};

const SelectAutoWidth = ({ disabled, value, onChange, children }) => {
  return (
    <ThemeProvider theme={theme}>
        <FormControl sx={{ mr: 1, minWidth: 50 }}>
            <Select
                disabled={disabled}
                value={value}
                onChange={onChange}
                autoWidth
                MenuProps={MenuProps}
            >
                {children}
            </Select>
        </FormControl>
    </ThemeProvider>
  );
};

export default SelectAutoWidth;