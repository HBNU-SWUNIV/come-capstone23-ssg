// SERVER: 스마트팜 중앙문 상태 및 제어 정보 요청

import { Box, Typography } from '@mui/material';
import MyCard from '../common/MyCard';
import TypographyWithButton from '../common/TypographyWithButton';
import CheckBoxWithLabel from '../common/CheckBoxWithLabel';
import TypographyWithTimePicker from '../common/TypographyWithTimePicker';

const CenterDoorControl = ({
    remoteControl,
    centerDoorControl,
    onWorkChange,
    onAutoWorkChange,
    onAutoWorkStartTimeChange,
    onAutoWorkEndTimeChange
}) => {
    return (
        <div style={{ width: '100%'}} >
            <MyCard sx={{ width: '100%' }}>
                <TypographyWithButton
                    text='문 열기/닫기'
                    buttonText={centerDoorControl.workButtonText}
                    disabled={!remoteControl || centerDoorControl.autoWork}
                    onClick={onWorkChange}
                    sx={{ mt: 1.5 }}
                />
                <CheckBoxWithLabel
                    text='자동 문 열기/닫기'
                    checked={centerDoorControl.autoWork}
                    disabled={!remoteControl}
                    onChange={onAutoWorkChange}
                    sx={{ mt: 1.5 }}
                />
                <TypographyWithTimePicker
                    text='여는 시각'
                    disabled={!centerDoorControl.autoWork}
                    value={centerDoorControl.autoWorkStartTime}
                    onChange={onAutoWorkStartTimeChange}
                />
                <TypographyWithTimePicker
                    text='닫는 시각'
                    disabled={!centerDoorControl.autoWork}
                    value={centerDoorControl.autoWorkEndTime}
                    onChange={onAutoWorkEndTimeChange}
                    sx={{ mt: 0.3 }}
                />
            </MyCard>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant='h6' sx={{ mt: 6 }}>{centerDoorControl.status}</Typography>
            </Box>
        </div>
    )
};

export default CenterDoorControl;