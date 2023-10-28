// 회원가입 완료 버튼 기능 추가하기: 이름, 아이디, 비밀번호 유효성 검사 완료 후 클릭 가능

import { Grid, Typography } from '@mui/material';
import TextFieldDefault from '../common/TextFieldDefault';
import TextFieldPassword from '../../containers/common/TextFieldPassword';
import ButtonDefault from '../common/ButtonDefault';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const SignUp = ({
    name,
    id,
    password,
    passwordCheck,
    onNameChange,
    onIdChange,
    onPasswordChange,
    onPasswordCheckChange,
    onSignUpSuccessClick,
    goBack
}) => {
    return (
        <div>
            <TextFieldDefault
                label="이름"
                autoFocus={true}
                value={name}
                onChange={onNameChange}
            />
            <TextFieldDefault
                label="아이디"
                value={id}
                onChange={onIdChange}    
            />
            <Grid container sx={{ mb: 2.5 }}>
                <Grid item xs={1}>
                    <WarningAmberRoundedIcon color="warning" sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant="caption">6~12자 영문, 숫자로 입력해주세요.</Typography>
                </Grid>
            </Grid>
            <TextFieldPassword
                inputLabel="비밀번호"
                value={password}
                onChange={onPasswordChange}
            />
            <TextFieldPassword
                error={password !== passwordCheck}
                inputLabel="비밀번호 확인"
                disabled={password === ''}
                value={passwordCheck}
                onChange={onPasswordCheckChange}
                id="check"
            />
            <Grid container>
                <Grid item xs={1}>
                    <WarningAmberRoundedIcon color="warning" sx={{ fontSize: 20 }}/>
                </Grid>
                <Grid item xs={11}>
                    <Typography variant="caption">비밀번호는 영문 대소문자, 숫자, 특수문자(.!@#$%)를 혼합하여 8~20자로 입력해주세요.</Typography>
                </Grid>
            </Grid>
            <ButtonDefault
                disabled={name === '' || id === '' || password === '' || password !== passwordCheck}
                color="secondary"
                sx={{
                    mt: 6.5,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={onSignUpSuccessClick}
                text="회원가입 완료"
            />
            <ButtonDefault
                color="secondary"
                sx={{
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={goBack}
                text="취소"
            />
        </div>
    );
};

export default SignUp;