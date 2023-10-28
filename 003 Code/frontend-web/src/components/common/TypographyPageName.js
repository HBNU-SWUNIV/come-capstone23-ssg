import { Typography } from '@mui/material';

const TypographyPageName = ({ text }) => {
    return (
        <Typography
            component="h1"
            variant="h5"
            sx={{
                mt: 4,
                mb: 6,
                fontWeight: 'bold',
                color: '#000000'
            }}
        >
            {text}
        </Typography>
    );
};

export default TypographyPageName;