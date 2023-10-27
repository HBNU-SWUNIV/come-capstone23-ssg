import { Container, Box, Typography, Button } from '@mui/material';

const SearchPasswordSuccess = () => {
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h5"
                        sx={{
                            mt: 4,
                            mb: 6,
                            fontWeight: 'bold',
                            color: '#000000'
                        }}
                    >
                        비밀번호 찾기 완료!
                    </Typography>
                    <Typography variant="subtitle1">
                        회원정보에 등록되어 있는 휴대전화번호로 임시 비밀번호를 전송해드렸습니다.
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 6.5,
                            mb: 2,
                            fontSize: 'medium',
                            fontWeight: 'bold'
                        }}
                    >
                        로그인
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default SearchPasswordSuccess;