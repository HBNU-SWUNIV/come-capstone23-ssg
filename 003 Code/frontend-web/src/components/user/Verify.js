import TextFieldDefault from '../common/TextFieldDefault';
import ButtonDefault from '../common/ButtonDefault';

const Verify = ({
    name,
    phoneNumber,
    onNameChange,
    onPhoneNumberChange,
    goBack,
    goSignUp
}) => {
    var phoneNumberPattern = /01[016789]-[^0][0-9]{2,3}-[0-9]{4}/;

    return (    
        <div>
            <TextFieldDefault
                label="이름"
                autoFocus={true}
                value={name}
                onChange={onNameChange}
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
                disabled={name === '' || !phoneNumberPattern.test(phoneNumber)}
                color="secondary"
                sx={{
                    mt: 6.5,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={goSignUp}
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

export default Verify;