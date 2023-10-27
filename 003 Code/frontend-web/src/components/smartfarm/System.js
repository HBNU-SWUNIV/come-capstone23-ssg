import { Link } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

const System = ({ image, imageLink, title, text, sx }) => {
    return (
        <Link
            to={imageLink}
            style={{
                textDecoration: 'none',
                color: '#000000'
            }}
        >
        <Stack
            direction='row'
            alignItems='center'
            sx={sx}
        >
            <img
                src={image}
                alt={title}
                style={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover'
                }}
            />
            <Stack
                direction='column'
                sx={{ ml: 2 }}
            >
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>{title}</Typography>
                <Typography variant='subtitle1'>{text}</Typography>
            </Stack>
        </Stack>
        </Link>
    );
};

export default System;