import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import TextFieldDefault from "../common/TextFieldDefault";
import ButtonDefault from '../common/ButtonDefault';
import TextFieldPassword from '../../containers/common/TextFieldPassword';

const SettingPersonalInformation = ({
    name,
    phoneNumber,
    password,
    open,
    onNameChange,
    onPhoneNumberChange,
    onPasswordChange,
    onModifyClick,
    onOpenClick,
    onYesClick,
    onNoClick,
    goBack
}) => {
    var phoneNumberPattern = /01[016789]-[^0][0-9]{2,3}-[0-9]{4}/;

    return (
        <div style={{ marginTop: 32 }}>
            <TextFieldDefault
                label="이름"
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
                sx={{
                    mt: 6.5,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={onModifyClick}
                text="개인정보 수정"
            />
            <ButtonDefault
                sx={{
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                color='secondary'
                onClick={onOpenClick}
                text="회원 탈퇴"
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
            <Dialog
                open={open}
                onClose={onNoClick}
            >
                <DialogTitle>회원 탈퇴</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        회원 탈퇴 시 개인정보와 작성한 스마트팜 및 작물 관련 데이터가 전부 삭제됩니다.
                        그래도 탈퇴하신다면, 아래 비밀번호를 입력 후 예 버튼을 클릭해주세요.
                    </DialogContentText>
                    <TextFieldPassword
                        inputLabel="비밀번호"
                        value={password}
                        onChange={onPasswordChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onNoClick}>아니요</Button>
                    <Button
                        disabled={password === ''}
                        onClick={onYesClick}
                    >
                        예
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SettingPersonalInformation;