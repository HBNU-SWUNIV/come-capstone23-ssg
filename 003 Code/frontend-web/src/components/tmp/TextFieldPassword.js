import { useState } from 'react';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const TextFieldPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    return (
        <FormControl 
            variant="outlined"
            fullWidth
            margin="normal"
        >
            <InputLabel htmlFor="outlined-adornment-password" color="info">비밀번호</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                label="비밀번호"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                        </IconButton>
                    </InputAdornment>
                }
                color="info"
            />
        </FormControl>
    );
};

export default TextFieldPassword;