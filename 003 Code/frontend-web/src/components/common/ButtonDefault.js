import { Button } from '@mui/material';

const ButtonDefault = ({ color, disabled, sx, onClick, text }) => {
    return (
        <Button
            variant="contained"
            color={color}
            fullWidth
            disabled={disabled}
            sx={sx}
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default ButtonDefault;