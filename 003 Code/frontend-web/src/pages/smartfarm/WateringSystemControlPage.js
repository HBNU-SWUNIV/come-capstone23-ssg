import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContainerBox from '../../components/common/ContainerBox';
import ControlAppBar from '../../containers/smartfarm/ControlAppBar';
import WateringSystemControl from '../../containers/smartfarm/WateringSystemControl';
import ControlTabs from '../../components/smartfarm/ControlTabs';
import Snackbar from '../../containers/common/Snackbar';

const WateringSystemControlPage = () => {
    const token = useSelector(state => state.user.token);

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate(process.env.REACT_APP_LOGIN_PATH);
        }
    }, [token, navigate]);
    
    return (
        <div>
            <ControlAppBar text='관수 시스템'/>
            <ContainerBox maxWidth="sm">
                <WateringSystemControl />
            </ContainerBox>
            <ControlTabs />
            <Snackbar />
        </div>
    )
};

export default WateringSystemControlPage;