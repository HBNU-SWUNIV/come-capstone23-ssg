import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContainerBox from '../../components/common/ContainerBox';
import TypographyPageName from '../../components/common/TypographyPageName';
import RegisterSmartfarm from '../../containers/smartfarm/RegisterSmartfarm';
import Snackbar from '../../containers/common/Snackbar';

const RegisterSmartfarmPage = () => {
    const token = useSelector(state => state.user.token);

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate(process.env.REACT_APP_LOGIN_PATH);
        }
    }, [token, navigate]);
    
    return (
        <div>
            <ContainerBox maxWidth="xs">
                <TypographyPageName text="스마트팜 등록"/>
                <RegisterSmartfarm />
            </ContainerBox>
            <Snackbar />
        </div>
    );
};

export default RegisterSmartfarmPage;