import { Box, Typography } from '@mui/material';
import ButtonDefault from '../common/ButtonDefault';
import greenhouse from '../../lib/icon/greenhouse.png';

const HomeNotRegisterSmartfarm = ({ onClick }) => {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <img
                    src={greenhouse}
                    alt='스마트팜'
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
                    등록된 스마트팜이 없어요
                </Typography>
                <Typography
                    variant='subtitle1'
                    sx={{ textAlign: 'center', mt: 1 }}
                >
                    스마트팜을 등록하시면<br/>
                    스마트팜 및 작물을 실시간으로 모니터링 하실 수 있어요
                </Typography>
                <ButtonDefault
                    sx={{
                        mt: 4,
                        mb: 2,
                        fontSize: 'medium',
                        fontWeight: 'bold',
                        color: '#ffffff'
                    }}
                    onClick={onClick}
                    text="스마트팜 등록"
                />
            </Box>
        </div>
    )
};

export default HomeNotRegisterSmartfarm;