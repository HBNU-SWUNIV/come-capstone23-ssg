import TextFieldDefault from '../common/TextFieldDefault';
import ButtonDefault from '../common/ButtonDefault';

const SearchId = ({
    name,
    id,
    phoneNumber,
    onNameChange,
    onIdChange,
    onPhoneNumberChange,
    goBack,
    goNext
}) => {
    var phoneNumberPattern = /01[016789]-[^0][0-9]{2,3}-[0-9]{4}/;

    return (
        <div>
            <TextFieldDefault
                label="이름"
                autoFocus={true}
                value={name}
                onChange={onNameChange}
            />
            <TextFieldDefault
                label="아이디"
                disabled={name === ''}
                value={id}
                onChange={onIdChange}
                sx={{ mb: 3 }}
            />
            <TextFieldDefault
                error={phoneNumber !== '' && !phoneNumberPattern.test(phoneNumber)}
                label="휴대전화번호"
                helperText="XXX-XXXX-XXXX(XXX-XXX-XXXX) 형식으로 입력해주세요"
                value={phoneNumber}
                onChange={onPhoneNumberChange}
            />
            <ButtonDefault
                disabled={name === '' || id === '' || !phoneNumberPattern.test(phoneNumber)}
                color="secondary"
                sx={{
                    mt: 6.5,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={goNext}
                text="다음"
            />
            <ButtonDefault
                color="secondary"
                sx={{
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={goBack}
                text="취소"
            />
        </div>
    );
};

export default SearchId;