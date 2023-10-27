import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from "../../containers/common/AppBar";
import ContainerBox from "../../components/common/ContainerBox";
import SettingSmartfarm from "../../containers/setting/SettingSmartfarm";
import Snackbar from '../../containers/common/Snackbar';

const SettingSmartfarmPage = () => {
    const token = useSelector(state => state.user.token);
    const exist = useSelector(state => state.smartfarm.exist);

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate(process.env.REACT_APP_LOGIN_PATH);
        } else if (!exist) {
            navigate(process.env.REACT_APP_REGISTER_SMARTFARM_PATH);
        }
    }, [token, exist, navigate]);
    
    return (
        <div>
            <AppBar text='스마트팜 수정'/>
            <ContainerBox maxWidth='xs'>
                <SettingSmartfarm />
            </ContainerBox>
            <Snackbar />
        </div>
    );
};

export default SettingSmartfarmPage;