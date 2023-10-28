import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContainerBox from '../../components/common/ContainerBox';
import ControlAppBar from '../../containers/smartfarm/ControlAppBar';
import FanControl from '../../containers/smartfarm/FanControl';
import ControlTabs from '../../components/smartfarm/ControlTabs';
import Snackbar from '../../containers/common/Snackbar';

const FanControlPage = () => {
    const token = useSelector(state => state.user.token);

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate(process.env.REACT_APP_LOGIN_PATH);
        }
    }, [token, navigate]);
    
    return (
        <div>
            <ControlAppBar text='환기팬'/>
            <ContainerBox maxWidth="sm">
                <FanControl />
            </ContainerBox>
            <ControlTabs />
            <Snackbar />
        </div>
    )
};

export default FanControlPage;