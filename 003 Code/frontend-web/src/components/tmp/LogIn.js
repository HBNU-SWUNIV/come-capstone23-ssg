import { useState } from 'react';
import { Container, Box, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton ,Button, Grid, Link } from '@mui/material';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

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
                        variant="h3"
                        sx={{
                            mt: 4,
                            mb: 3,
                            fontWeight: 'bold',
                            color: '#4caf80'
                        }}
                    >
                        Smart Farm
                    </Typography>
                    <TextField
                        label="아이디"
                        fullWidth
                        color="info"
                        margin="normal"
                        autoFocus
                    />
                    <FormControl 
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    >
                        <InputLabel htmlFor="outlined-adornment-password" color="info">비밀번호</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            label="비밀번호"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            color="info"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 4,
                            mb: 2,
                            fontSize: 'medium',
                            fontWeight: 'bold',
                            color: '#ffffff'
                        }}
                    >
                        로그인
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                            mb: 4,
                            fontSize: 'medium',
                            fontWeight: 'bold'
                        }}
                    >
                        회원가입
                    </Button>
                    <Grid container>
                        <Grid item xs >
                            <Link
                                href="/"
                                underline="none"
                                sx={{ color: '#000000' }}
                            >
                                아이디 찾기
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                href="/"
                                underline="none"
                                sx={{ color: '#000000' }}
                            >
                                비밀번호 찾기
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default LogIn;