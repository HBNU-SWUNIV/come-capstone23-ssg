import { Stack, Typography, Divider } from '@mui/material';
import MyCard from '../common/MyCard';

const SettingBox = ({ image, title, children, sx }) => {
    return (
        <MyCard sx={sx}>
            <Typography variant='h6'>{title}</Typography>
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

export default SettingBox;