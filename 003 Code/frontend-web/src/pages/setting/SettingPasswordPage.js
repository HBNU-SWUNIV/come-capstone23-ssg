import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from "../../containers/common/AppBar";
import ContainerBox from '../../components/common/ContainerBox';
import SettingPassword from "../../containers/setting/SettingPassword";

const SettingPasswordPage = () => {
    const token = useSelector(state => state.user.token);

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate(process.env.REACT_APP_LOGIN_PATH);
        }
    }, [token, navigate]);
    
    return (
        <div>
            <AppBar text='비밀번호 재설정'/>
            <ContainerBox maxWidth='xs'>
                <SettingPassword />
            </ContainerBox>
        </div>
    );
};

export default SettingPasswordPage;