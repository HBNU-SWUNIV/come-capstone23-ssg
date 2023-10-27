import ContainerBox from '../../components/common/ContainerBox';
import TypographyPageName from '../../components/common/TypographyPageName';
import SearchPasswordFailure from '../../containers/user/SearchPasswordFailure';

const SearchPasswordFailurePage = () => {
    return (
        <ContainerBox maxWidth="xs">
            <TypographyPageName text="비밀번호 찾기 실패"/>
            <SearchPasswordFailure />
        </ContainerBox>
    );
};

export default SearchPasswordFailurePage;