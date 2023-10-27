import { Box, Typography } from '@mui/material';
import ButtonDefault from '../common/ButtonDefault';
import plant from '../../lib/icon/plant.png';

const HomeNotRegisterPlant = ({ onClick }) => {
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
                등록된 작물이 없어요
            </Typography>
            <Typography
                variant='subtitle1'
                sx={{ textAlign: 'center', mt: 1 }}
            >
                작물을 등록하시면<br/>
                작물을 실시간으로 모니터링 하실 수 있어요
            </Typography>
            <ButtonDefault
                sx={{
                    mt: 4,
                    fontSize: 'medium',
                    fontWeight: 'bold',
                    color: '#ffffff'
                }}
                onClick={onClick}
                text="작물 등록"
            />
        </Box>
    );
};

export default HomeNotRegisterPlant;