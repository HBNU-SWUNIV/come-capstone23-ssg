import { Box, Typography } from '@mui/material';

const ImgWithTypography = ({ image, text }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 8
            }}
        >
            <img
                src={image}
                alt={text}
                style={{
                    width: 120,
                    height: 120,
                    objectFit: 'cover'
                }}
            />
            <Typography
                variant="h4"
                sx={{
                    mt: 4,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}
            >
                {text}
            </Typography>
        </Box>
    );
};

export default ImgWithTypography;