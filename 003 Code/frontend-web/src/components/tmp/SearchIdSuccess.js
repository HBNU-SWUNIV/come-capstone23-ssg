import { Container, Box, Typography, Button } from '@mui/material';

const SearchIdSuccess = () => {
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
                        아이디 찾기 완료!
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                        찾으시는 아이디는 다음 아래와 같습니다.
                    </Typography>
                    <Typography variant="body1">
                        lime0716
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

export default SearchIdSuccess;