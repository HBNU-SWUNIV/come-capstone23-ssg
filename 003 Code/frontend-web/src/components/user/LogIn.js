// SERVER: '로그인' 버튼 클릭 시 서버에 정보를 전달해서 검증 요청 → 검증받으면 홈 화면으로 이동하기

import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import TextFieldDefault from '../common/TextFieldDefault';
import TextFieldPassword from '../../containers/common/TextFieldPassword';
import ButtonDefault from '../common/ButtonDefault';

const LogIn = ({
    id,
    password,
    onIdChange,
    onPasswordChange,
    onLogInClick,
    goVerify
}) => {
    return (
        <div>
            <TextFieldDefault
                label="아이디"
                autoFocus={true}
                value={id}
                onChange={onIdChange}
            />
            <TextFieldPassword
                inputLabel="비밀번호"
                value={password}
                onChange={onPasswordChange}
            />
            <ButtonDefault
                sx={{
                    mt: 4,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold',
                    color: '#ffffff'
                }}
                disabled={id === '' || password === ''}
                onClick={onLogInClick}
                text="로그인"
            />
            <ButtonDefault
                color="secondary"
                sx={{
                    mb: 4,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={goVerify}
                text="회원가입"
            />
            <Grid container>
                <Grid item xs >
                    <Link
                        to={process.env.REACT_APP_SEARCH_ID_PATH}
                        style={{
                            textDecoration: 'none',
                            color: '#000000'
                        }}
                    >
                        아이디 찾기
                    </Link>
                </Grid>
                <Grid item>
                    <Link
                        to={process.env.REACT_APP_SEARCH_PASSWORD_PATH}
                        style={{
                            textDecoration: 'none',
                            color: '#000000'
                        }}
                    >
                        비밀번호 찾기
                    </Link>
                </Grid>
            </Grid>
        </div>
    );
};

export default LogIn;