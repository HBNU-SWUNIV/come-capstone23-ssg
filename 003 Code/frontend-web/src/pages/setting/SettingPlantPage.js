import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from "../../containers/common/AppBar";
import ContainerBox from "../../components/common/ContainerBox";
import SettingPlant from "../../containers/setting/SettingPlant";
import Snackbar from '../../containers/common/Snackbar';

const SettingPlantPage = () => {
    const token = useSelector(state => state.user.token);
    const exist = useSelector(state => state.plant.exist);

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate(process.env.REACT_APP_LOGIN_PATH);
        } else if (!exist) {
            navigate(process.env.REACT_APP_REGISTER_PLANT_PATH);
        }
    }, [token, exist, navigate]);
    
    return (
        <div>
            <AppBar text='작물 수정'/>
            <ContainerBox maxWidth='xs'>
                <SettingPlant />
            </ContainerBox>
            <Snackbar />
        </div>
    );
};

export default SettingPlantPage;