import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ContainerBox from '../../components/common/ContainerBox';
import TypographyPageName from '../../components/common/TypographyPageName';
import RegisterPlant from '../../containers/smartfarm/RegisterPlant';

const RegisterPlantPage = () => {
    const token = useSelector(state => state.user.token);
    const exist = useSelector(state => state.plant.exist);

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate(process.env.REACT_APP_LOGIN_PATH);
        } else if (exist === true) {
            navigate(process.env.REACT_APP_HOME_PATH);
        }
    }, [token, exist, navigate]);
    
    return (
        <div>
            <ContainerBox maxWidth="xs">
                <TypographyPageName text="작물 등록"/>
                <RegisterPlant />
            </ContainerBox>
        </div>
    );
};

export default RegisterPlantPage;