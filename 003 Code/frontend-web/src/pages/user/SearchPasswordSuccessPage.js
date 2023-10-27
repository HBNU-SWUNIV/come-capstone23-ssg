import ContainerBox from '../../components/common/ContainerBox';
import TypographyPageName from '../../components/common/TypographyPageName';
import SearchPasswordSuccess from '../../containers/user/SearchPasswordSuccess';

const SearchPasswordSuccessPage = () => {
    return (
        <ContainerBox maxWidth="xs">
            <TypographyPageName text="비밀번호 찾기 성공!"/>
            <SearchPasswordSuccess />
        </ContainerBox>
    );
};

export default SearchPasswordSuccessPage;