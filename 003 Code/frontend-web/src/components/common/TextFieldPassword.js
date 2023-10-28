import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const TextFieldPassword = ({ inputLabel, disabled, showPassword, value, onChange, onClickShowPassword, onMouseDownPassword, id, error }) => {
    return (
        <FormControl 
            variant="outlined"
            fullWidth
            margin="normal"
        >
            <InputLabel
                htmlFor="outlined-adornment-password"
                color="info"
                error={error}
            >
                {inputLabel}
            </InputLabel>
            <OutlinedInput
                id={id === 'check'? "outlined-adornment-password-check" : "outlined-adornment-password"}
                error={error}
                disabled={disabled}
                label={inputLabel}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            disabled={disabled}
                            onClick={onClickShowPassword}
                            onMouseDown={onMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                        </IconButton>
                    </InputAdornment>
                }
                color="info"
            />
        </FormControl>
    );
};

export default TextFieldPassword;