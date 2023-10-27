import ContainerBox from '../../components/common/ContainerBox';
import TypographyPageName from '../../components/common/TypographyPageName';
import SearchId from '../../containers/user/SearchId';

const SearchIdPage = () => {
    return (
        <ContainerBox maxWidth="xs">
            <TypographyPageName text="아이디 찾기"/>
            <SearchId />
        </ContainerBox>
    );
};

export default SearchIdPage;