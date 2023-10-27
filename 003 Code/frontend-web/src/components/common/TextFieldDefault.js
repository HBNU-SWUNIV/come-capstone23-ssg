import { TextField } from '@mui/material';

const TextFieldDefault = ({ error, disabled, label, helperText, value, onChange, autoFocus, sx }) => {
    return (
        <TextField
            error={error}
            disabled={disabled}
            label={label}
            helperText={error ? helperText : undefined}
            value={value}
            onChange={onChange}
            fullWidth
            color='info'
            margin='normal'
            autoFocus={autoFocus}
            sx={sx}
        />
    );
};

export default TextFieldDefault;