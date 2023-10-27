import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerBox from '../../components/common/ContainerBox';
import ImgWithTypography from '../../components/common/ImgWithTypography';
import plant from '../../lib/icon/plant.png';

const RegisterSmartfarmSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {navigate(-2)}, 2000);
    });
    
    return (
        <ContainerBox maxWidth="xs">
            <ImgWithTypography image={plant} text='작물 등록 완료!'/>
        </ContainerBox>
    );
};

export default RegisterSmartfarmSuccessPage;