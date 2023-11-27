import { Stack, Typography } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const SettingItem = ({ image, title, go }) => {
    return (
        <div style={{ marginTop: 20, marginBottom: 20 }}>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='flex-start'
                >
                    <img
                        src={image}
                        alt={title}
                        style={{
                            width: 45,
                            height: 45,
                            objectFit: 'cover'
                        }}
                    />
                    <Typography variant='subtitle1' sx={{ ml: 2, fontWeight: 'bold' }}>{title}</Typography>
                </Stack>
                <ArrowForwardIosRoundedIcon
                    color='secondary'
                    sx={{ cursor: 'pointer' }}
                    onClick={go}
                />
            </Stack>
        </div>
    );
};

export default SettingItem;