// SERVER: 알람 취소 다이어그램에서 '예' 버튼 클릭 시 DB에서 해당 알람 삭제 요청하기

import { Stack, Typography, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const AlarmItem = ({
    alarm,
    open,
    onOpenClick,
    onYesClick,
    onNoClick
}) => {
    return (
        <div>
            <Stack
                direction='column'
                sx={{
                    mt: 2,
                    mb: 2,
                    cursor: 'pointer'
            }}
                onClick={onOpenClick}
            >
                <Typography variant='subtitle1'>{alarm.body}</Typography>
                <Typography variant='overline' sx={{ textAlign: 'right' }}>{alarm.time}</Typography>
            </Stack>
            <Dialog
                open={open}
                onClose={onNoClick}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {'해당 알람을 삭제하시겠습니까?'}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={onNoClick}>아니요</Button>
                    <Button onClick={onYesClick}>예</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlarmItem;