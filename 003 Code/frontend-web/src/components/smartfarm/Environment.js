import { Stack, Typography } from '@mui/material';

const Environment = ({ name, value, sx }) => {
    return (
        <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={sx}
        >
            <Typography variant='h6'>{name}</Typography>
            <Typography variant='h6'>{value}</Typography>
        </Stack>
    );
};

export default Environment;