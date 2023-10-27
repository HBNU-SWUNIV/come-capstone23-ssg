import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';

const SearchId = () => {
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
                        아이디 찾기
                    </Typography>
                    <TextField
                        label="이름"
                        fullWidth
                        color="info"
                        autoFocus
                        sx={{ mb: 3 }}
                    />
                    <Grid container columnSpacing={1.5} rowSpacing={3}>
                        <Grid item xs={8}>
                            <TextField
                                label="휴대전화번호('-' 제외)"
                                fullWidth
                                color="info"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant="contained"
                                disabled={true}
                                color="secondary"
                                fullWidth
                                sx={{ height: '100%' }}
                            >
                                인증번호 전송
                            </Button>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                label="인증번호"
                                disabled={true}
                                fullWidth
                                color="info"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                disabled={true}
                                variant="contained"
                                color="secondary"
                                fullWidth
                                sx={{ height: '100%' }}
                            >
                                인증번호 확인
                            </Button>
                        </Grid>
                    </Grid>
                    <Button
                        disabled={true}
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
                        다음
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                            fontSize: 'medium',
                            fontWeight: 'bold'
                        }}
                    >
                        취소
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default SearchId;