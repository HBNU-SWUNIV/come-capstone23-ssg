import { Stack, Typography } from '@mui/material';

const TextWithEmoji = ({
    text,
    emoji,
    sx
}) => {
    return (
        <Stack
            direction='row'
            alignItems='center'
            sx={sx}
        >
            <Typography variant='subtitle1'>{text}</Typography>
            <img
                src={emoji}
                alt='이모티콘'
                style={{
                    width: 20,
                    height: 20,
                    marginLeft: 5,
                    objectFit: 'cover'
                }}
            />
        </Stack>
    );
};

export default TextWithEmoji;