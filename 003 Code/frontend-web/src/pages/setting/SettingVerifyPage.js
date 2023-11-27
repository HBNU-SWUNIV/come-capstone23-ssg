import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import ContainerBox from '../../components/common/ContainerBox';
import AppBar from '../../containers/common/AppBar';
import TypographyPageName from '../../components/common/TypographyPageName';
import SettingVerify from '../../containers/setting/SettingVerify';

const destinations = {
    'password': '비밀번호 재설정',
    'smartfarm': '스마트팜 수정',
    'plant': '작물 수정'
};

const SettingVerifyPage = () => {
    const token = useSelector(state => state.user.token);

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate(process.env.REACT_APP_LOGIN_PATH);
        }
    }, [token, navigate]);
    
    const params = useParams();
    const destination = destinations[params.destination];
    
    return (
        destination === undefined ? <Navigate to={"/*"} replace={true}/> :
        <div>
            <AppBar text={destination}/>
            <ContainerBox maxWidth='xs'>
                <TypographyPageName text='비밀번호 확인'/>
                <SettingVerify />
            </ContainerBox>
        </div>
    );
};

export default SettingVerifyPage;