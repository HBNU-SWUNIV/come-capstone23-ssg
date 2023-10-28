import { Container, Box, Typography, TextField, Button, Grid } from "@mui/material";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const SignUp = () => {
    return (
        <Container comonent="main" maxWidth="xs">
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
                        mb: 3,
                        fontWeight: 'bold',
                        color: '#000000'
                    }}
                >
                    회원가입
                </Typography>
                <TextField
                    label="이름"
                    fullWidth
                    color="info"
                    margin="normal"
                    autoFocus
                />
                <TextField
                    label="아이디"
                    fullWidth
                    color="info"
                    margin="normal"
                />
                <Grid container sx={{ mb: 2.5 }}>
                    <Grid item xs={1}>
                        <WarningAmberRoundedIcon color="warning" sx={{ fontSize: 20 }}/>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="caption">6~12자 영문, 숫자로 입력해주세요.</Typography>
                    </Grid>
                </Grid>
                <TextField
                    label="비밀번호"
                    type="password"
                    fullWidth
                    color="info"
                    margin="normal"
                />
                <TextField
                    label="비밀번호 확인"
                    type="password"
                    disabled={true}
                    fullWidth
                    color="info"
                    margin="normal"
                />
                <Grid container>
                    <Grid item xs={1}>
                        <WarningAmberRoundedIcon color="warning" sx={{ fontSize: 20 }}/>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="caption">비밀번호는 영문 대소문자, 숫자, 특수문자(.!@#$%)를 혼합하여 8~20자로 입력해주세요.</Typography>
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
                    회원가입 완료
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
    );
};

export default SignUp;