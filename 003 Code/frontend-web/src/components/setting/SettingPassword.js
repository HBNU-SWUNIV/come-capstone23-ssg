// SERVER: 서버로 비밀번호 재설정 요청
// 비밀번호 재설정 성공 여부에 따른 결과
// 성공: 설정 목록 화면으로 이동
// 실패: 해당 화면에 그대로

import { Grid, Typography } from '@mui/material';
import TextFieldPassword from "../../containers/common/TextFieldPassword";
import ButtonDefault from "../common/ButtonDefault";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

const SettingPassword = ({
    password,
    passwordCheck,
    onPasswordChange,
    onPasswordCheckChange,
    onModifyClick,
    goBack
}) => {
    return (
        <div style={{ marginTop: 32 }}>
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
                disabled={password === '' || password !== passwordCheck}
                sx={{
                    mt: 6.5,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={onModifyClick}
                text="다음"
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

export default SettingPassword;