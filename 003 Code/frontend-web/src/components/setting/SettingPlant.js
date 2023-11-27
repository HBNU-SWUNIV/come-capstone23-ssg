// SERVER: 서버로 작물 수정 요청

import { Stack, Typography, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import TextFieldDefault from '../common/TextFieldDefault';
import SelectAutoWidth from '../common/SelectAutoWidth';
import ButtonDefault from '../common/ButtonDefault';

const SettingPlant = ({
    name,
    day,
    open,
    onNameChange,
    onDayChange,
    onModifyClick,
    onOpenClick,
    onYesClick,
    onNoClick,
    goBack
}) => {
    const numbers = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30
    ];

    return (
        <div style={{ marginTop: 32, width: '100%' }}>
            <TextFieldDefault
                label="이름"
                autoFocus={true}
                value={name}
                onChange={onNameChange}
            />
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                sx={{ mt: 3 }}
            >
                <Typography variant='subtitle1' sx={{ mr: 1.5 }}>작물을 키운 지</Typography>
                <SelectAutoWidth value={day} onChange={onDayChange}>
                    {numbers.map((number, index) => <MenuItem key={index} value={number}>{number}</MenuItem>)}
                </SelectAutoWidth>
                <Typography variant='subtitle1' sx={{ ml: 1 }}>일 지났어요</Typography>
            </Stack>
            <ButtonDefault
                disabled={false}
                sx={{
                    mt: 6.5,
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={onModifyClick}
                text="작물 수정"
            />
            <ButtonDefault
                color="secondary"
                sx={{
                    mb: 2,
                    fontSize: 'medium',
                    fontWeight: 'bold'
                }}
                onClick={onOpenClick}
                text="작물 삭제"
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
                <DialogTitle>작물 삭제</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        작물 삭제 시 해당 작물 정보를 확인할 수 없습니다.
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

export default SettingPlant;