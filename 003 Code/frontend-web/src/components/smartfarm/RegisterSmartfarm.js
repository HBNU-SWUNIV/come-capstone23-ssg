// SERVER: '스마트팜 등록' 버튼 클릭 시 DB에 스마트팜 등록 요청

import TextFieldWithButton from '../common/TextFieldWithButton';
import ButtonDefault from '../common/ButtonDefault';

const RegisterSmartfarm = ({
    smartfarmNumber,
    checkSmartfarmNumberSuccess,
    onSmartfarmNumberChange,
    onCheckSmartfarmNumberClick,
    onRegisterClick,
    goBack
}) => {
    return (
        <div style={{ width: '100%' }}>
            <TextFieldWithButton
                textFieldLabel="스마트팜 고유번호"
                textFieldValue={smartfarmNumber}
                textFieldOnChange={onSmartfarmNumberChange}
                buttonDisabled={smartfarmNumber === '' ? true : false}
                buttonOnClick={onCheckSmartfarmNumberClick}
                buttonText="중복 확인"
            />
            <ButtonDefault
                disabled={!checkSmartfarmNumberSuccess}
                sx={{
                    mt: 6.5,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={onRegisterClick}
                text="스마트팜 등록"
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
    )
};

export default RegisterSmartfarm;