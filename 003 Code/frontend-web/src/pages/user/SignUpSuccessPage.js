import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContainerBox from '../../components/common/ContainerBox';
import ImgWithTypography from '../../components/common/ImgWithTypography';
import wave from '../../lib/emoji/wave.png';

const SingUpSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {navigate(process.env.REACT_APP_LOGIN_PATH)}, 2000);
    });
    
    return (
        <ContainerBox maxWidth="xs">
            <ImgWithTypography image={wave} text='회원가입 완료!'/>
        </ContainerBox>
    );
};

export default SingUpSuccessPage;