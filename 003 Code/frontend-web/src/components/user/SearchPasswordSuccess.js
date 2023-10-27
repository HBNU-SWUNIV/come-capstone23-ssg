import { Box, Typography } from '@mui/material';
import ButtonDefault from '../common/ButtonDefault';

const SearchPasswordSuccess = ({ password, goLogIn }) => {
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
                    임시 비밀번호는 다음 아래와 같습니다. 로그인 후 비밀번호를 다시 설정해주시기 바랍니다.
                </Typography>
                <Typography variant="body1">
                    {password}
                </Typography>
            </Box>
            <ButtonDefault
                sx={{
                    mt: 6.5,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={goLogIn}
                text="로그인"
            />
        </div>
    );
};

export default SearchPasswordSuccess;