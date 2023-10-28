import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerBox from '../../components/common/ContainerBox';
import ImgWithTypography from '../../components/common/ImgWithTypography';
import plant from '../../lib/icon/plant.png';

const RemoveSmartfarmSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {navigate(process.env.REACT_APP_SETTING_PATH)}, 2000);
    });
    
    return (
        <ContainerBox maxWidth="xs">
            <ImgWithTypography image={plant} text='작물 삭제 완료!'/>
        </ContainerBox>
    );
};

export default RemoveSmartfarmSuccessPage;