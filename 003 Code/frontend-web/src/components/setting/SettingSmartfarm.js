// SERVER: 서버로 스마트팜 수정 요청

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import TextFieldWithButton from '../common/TextFieldWithButton';
import ButtonDefault from '../common/ButtonDefault';

const SettingSmartfarm = ({
    smartfarmNumber,
    checkSmartfarmNumberSuccess,
    open,
    onSmartfarmNumberChange,
    onCheckSmartfarmNumberClick,
    onModifyClick,
    onOpenClick,
    onYesClick,
    onNoClick,
    goBack
}) => {
    return (
        <div style={{ width: '100%', marginTop: 32 }}>
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
                onClick={onModifyClick}
                text="스마트팜 수정"
            />
            <ButtonDefault
                color="secondary"
                sx={{
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={onOpenClick}
                text="스마트팜 삭제"
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
                <DialogTitle>스마트팜 삭제</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        스마트팜 삭제 시 해당 스마트팜 정보 확인 및 제어를 할 수 없습니다.
                        그래도 삭제하신다면, 아래 예 버튼을 클릭해주세요.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onNoClick}>아니요</Button>
                    <Button onClick={onYesClick}>예</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SettingSmartfarm;