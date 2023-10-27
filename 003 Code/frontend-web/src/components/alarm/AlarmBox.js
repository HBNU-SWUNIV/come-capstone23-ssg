import { Stack, Typography, Divider } from '@mui/material';
import MyCard from '../common/MyCard';

const AlarmBox = ({ image, title, children, sx }) => {
    return (
        <MyCard sx={sx}>
            <Stack
                direction='row'
                alignItems='center'
            >
                <img
                    src={image}
                    alt={title}
                    style={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover'
                    }}
                />
                <Typography variant='h6' sx={{ ml: 2 }}>{title}</Typography>
            </Stack>
            <Stack
                direction='column'
                divider={<Divider orientation="horizontal" flexItem />}
                sx={{ mt: 2 }}
            >
                {children}
            </Stack>
        </MyCard>
    );
};

export default AlarmBox;