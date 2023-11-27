import { Box, Typography } from '@mui/material';
import TextWithEmoji from '../common/TextWithEmoji';
import ButtonDefault from '../common/ButtonDefault';
import plant from '../../lib/icon/plant.png';
import laugh from '../../lib/emoji/laugh.png';
import smile from '../../lib/emoji/smile.png';
import frown from '../../lib/emoji/frown.png';
import dizzy from '../../lib/emoji/dizzy.png';

const textWithNdvi = (ndvi, name) => {
    if (ndvi === null) {
        return (
            <></>
        )
    }

    if (ndvi > 0.5) {
        return (
            <>
                <TextWithEmoji
                    text= '농부의 DNA가 흐르고 있네요'
                    emoji={laugh}
                    sx={{ mt: 3 }}
                />
                <Typography sx={{ mt: 0.5 }}>
                    {name}는 건강하게 자라고 있으니 걱정마세요
                </Typography>
            </>
        )
    } else if (ndvi > 0) {
        return (
            <>
                <TextWithEmoji
                    text= '식집사로 거듭나고 있어요'
                    emoji={smile}
                    sx={{ mt: 3 }}
                />
                <Typography sx={{ mt: 0.5 }}>
                    {name}가 열심히 힘을 내고 있어요
                </Typography>
            </>
        )
    } else if (ndvi > -0.5) {
        return (
            <>
                <TextWithEmoji
                    text= '아직 포기하기엔 일러요'
                    emoji={frown}
                    sx={{ mt: 3 }}
                />
                <Typography sx={{ mt: 0.5 }}>
                    {name}에게 조금 더 관심과 애정을 주세요
                </Typography>
            </>
        )
    } else {
        return (
            <>
                <TextWithEmoji
                    text= '응급 상황이에요'
                    emoji={dizzy}
                    sx={{ mt: 3 }}
                />
                <Typography sx={{ mt: 0.5 }}>
                    {name}이 많이 아파하고 있어요
                </Typography>
            </>
        )
    }
};

const HomeRegisterPlant = ({
    name,
    day,
    ndvi,
    onHarvest
}) => {
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
                {name}와 {day}일 째
            </Typography>
            <ButtonDefault
                sx={{
                    mt: 3,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                text='수확'
                onClick={onHarvest}
            />
            {textWithNdvi(ndvi, name)}
        </Box>
    );
};

export default HomeRegisterPlant;