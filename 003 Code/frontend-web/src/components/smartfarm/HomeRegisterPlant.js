import { Box, Typography } from '@mui/material';
import TextWithEmoji from '../common/TextWithEmoji';
import ButtonDefault from '../common/ButtonDefault';
import plant from '../../lib/icon/plant.png';
import sad from '../../lib/emoji/sad.png';
import laugh from '../../lib/emoji/laugh.png';

const HomeRegisterPlant = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <img
                src={plant}
                alt='작물'
                style={{
                    width: 150,
                    height: 150,
                    objectFit: 'cover'
                }}
            />
            <Typography
                variant='h5'
                sx={{ fontWeight: 'bold', mt: 3.5 }}
            >
                새싹이와 10일 째
            </Typography>
            <TextWithEmoji
                text='90일 후에 새싹이와 헤어질 예정이에요'
                emoji={sad}
                sx={{ mt: 1 }}
            />
            <ButtonDefault
                color='secondary'
                disabled={true}
                sx={{
                    mt: 3,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                text='수확'
            />
            <TextWithEmoji
                text='농부의 DNA가 흐르고 있네요'
                emoji={laugh}
                sx={{ mt: 3 }}
            />
            <Typography sx={{ mt: 0.5 }}>새싹이는 건강하게 자라고 있으니 걱정마세요</Typography>
        </Box>
    );
};

export default HomeRegisterPlant;