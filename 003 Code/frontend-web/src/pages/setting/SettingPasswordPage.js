import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from "../../containers/common/AppBar";
import ContainerBox from '../../components/common/ContainerBox';
import SettingPassword from "../../containers/setting/SettingPassword";
import Snackbar from '../../containers/common/Snackbar';

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
            <Snackbar />
        </div>
    );
};

export default SettingPasswordPage;