import ContainerBox from '../../components/common/ContainerBox';
import TypographyPageName from '../../components/common/TypographyPageName';
import Verify from '../../containers/user/Verify';

const VerifyPage = () => {
    return (
        <ContainerBox maxWidth="xs">
            <TypographyPageName text="본인인증"/>
            <Verify />
        </ContainerBox>
    );
};

export default VerifyPage;