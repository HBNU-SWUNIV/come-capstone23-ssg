import ContainerBox from '../../components/common/ContainerBox';
import TypographyPageName from '../../components/common/TypographyPageName';
import Snackbar from '../../containers/common/Snackbar';
import SignUp from '../../containers/user/SignUp';

const SignUpPage = () => {
    return (
        <>
            <ContainerBox maxWidth="xs">
                <TypographyPageName text="회원가입"/>
                <SignUp />
            </ContainerBox>
            <Snackbar />
        </>
    );
};

export default SignUpPage;