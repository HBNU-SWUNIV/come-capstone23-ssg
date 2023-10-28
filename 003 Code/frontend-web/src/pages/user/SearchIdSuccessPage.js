import ContainerBox from '../../components/common/ContainerBox';
import TypographyPageName from '../../components/common/TypographyPageName';
import SearchIdSuccess from '../../containers/user/SearchIdSuccess';

const SearchIdSuccessPage = () => {
    return (
        <ContainerBox maxWidth="xs">
            <TypographyPageName text="아이디 찾기 성공!"/>
            <SearchIdSuccess />
        </ContainerBox>
    );
};

export default SearchIdSuccessPage;