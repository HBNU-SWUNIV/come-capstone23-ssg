import { Box, Typography } from "@mui/material";
import ButtonDefault from '../common/ButtonDefault';

const SearchPasswordFailure = ({
    goSearchId,
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
                <Typography variant="subtitle1">
                    입력하신 정보로 가입된 이력이 없습니다.
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
                onClick={goSearchId}
                text="아이디 찾기"
            />
            <ButtonDefault
                color="secondary"
                sx={{
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={goSearchPassword}
                text="비밀번호 찾기"
            />
            <ButtonDefault
                sx={{
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={goLogIn}
                text="로그인"
            />
        </div>
    );
};

export default SearchPasswordFailure;