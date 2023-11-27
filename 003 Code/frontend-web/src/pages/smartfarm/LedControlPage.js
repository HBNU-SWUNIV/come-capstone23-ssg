import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContainerBox from '../../components/common/ContainerBox';
import ControlAppBar from '../../containers/smartfarm/ControlAppBar';
import LedControl from '../../containers/smartfarm/LedControl';
import ControlTabs from '../../components/smartfarm/ControlTabs';

const LedControlPage = () => {
    const token = useSelector(state => state.user.token);

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate(process.env.REACT_APP_LOGIN_PATH);
        }
    }, [token, navigate]);

    return (
        <div>
            <ControlAppBar text='LED'/>
            <ContainerBox maxWidth="sm">
                <LedControl />
            </ContainerBox>
            <ControlTabs />
        </div>
    )
};

export default LedControlPage;