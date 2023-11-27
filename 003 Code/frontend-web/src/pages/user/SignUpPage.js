import ContainerBox from '../../components/common/ContainerBox';
import TypographyPageName from '../../components/common/TypographyPageName';
import SignUp from '../../containers/user/SignUp';

const SignUpPage = () => {
    return (
        <ContainerBox maxWidth="xs">
            <TypographyPageName text="회원가입"/>
            <SignUp />
        </ContainerBox>
    );
};

export default SignUpPage;