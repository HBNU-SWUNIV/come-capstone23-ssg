import { Stack, Typography, Button } from '@mui/material';

const TypographyWithButton = ({ text, buttonText, disabled, onClick, sx }) => {
    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={sx}
        >
            <Typography variant='h6'>{text}</Typography>
            <Button
                disabled={disabled}
                variant='contained'
                onClick={onClick}
                color='info'
            >
                {buttonText}
            </Button>
        </Stack>
    );
};

export default TypographyWithButton;