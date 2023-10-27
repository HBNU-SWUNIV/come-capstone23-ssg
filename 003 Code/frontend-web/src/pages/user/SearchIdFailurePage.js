import ContainerBox from '../../components/common/ContainerBox';
import TypographyPageName from '../../components/common/TypographyPageName';
import SearchIdFailure from '../../containers/user/SearchIdFailure';

const SearchIdFailurePage = () => {
    return (
        <ContainerBox maxWidth="xs">
            <TypographyPageName text="아이디 찾기 실패"/>
            <SearchIdFailure />
        </ContainerBox>
    );
};

export default SearchIdFailurePage;