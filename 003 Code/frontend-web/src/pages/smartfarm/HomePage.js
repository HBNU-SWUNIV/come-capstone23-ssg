import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppBar from '../../containers/common/AppBar';
import ContainerBox from '../../components/common/ContainerBox';
import Home from '../../containers/smartfarm/Home';

const HomePage = () => {
    const token = useSelector(state => state.user.token);

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate(process.env.REACT_APP_LOGIN_PATH);
        }
    }, [token, navigate]);
    
    return (
        <div>
            <AppBar text='홈'/>
            <ContainerBox maxWidth="sm">
                <Home />
            </ContainerBox>
        </div>
    );
};

export default HomePage;