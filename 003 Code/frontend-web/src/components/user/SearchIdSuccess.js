import { Box, Typography } from '@mui/material';
import ButtonDefault from '../common/ButtonDefault';

const SearchIdSuccess = ({
    id,
    goSearchPassword,
    goLogIn
}) => {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                    찾으시는 아이디는 다음 아래와 같습니다.
                </Typography>
                <Typography variant="body1">
                    {id}
                </Typography>
            </Box>
            <ButtonDefault
                color="secondary"
                sx={{
                    mt: 6.5,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                text="비밀번호 찾기"
                onClick={goSearchPassword}
            />
            <ButtonDefault
                sx={{
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                text="로그인"
                onClick={goLogIn}
            />
        </div>
    );
};

export default SearchIdSuccess;