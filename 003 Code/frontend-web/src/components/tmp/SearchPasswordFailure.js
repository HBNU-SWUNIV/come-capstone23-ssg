import { Container, Box, Typography, Button } from '@mui/material';

const SearchPasswordFailure = () => {
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
                        비밀번호 찾기 실패
                    </Typography>
                    <Typography variant="subtitle1">
                        입력하신 정보로 가입된 이력이 없습니다.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                            mt: 6.5,
                            mb: 2,
                            fontSize: 'medium',
                            fontWeight: 'bold'
                        }}
                    >
                        아이디 찾기
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                            mb: 2,
                            fontSize: 'medium',
                            fontWeight: 'bold'
                        }}
                    >
                        비밀번호 찾기
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
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

export default SearchPasswordFailure;