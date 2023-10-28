// SERVER: 스마트팜 환기팬 상태 및 제어 정보 요청

import { Box, Typography } from '@mui/material';
import MyCard from '../common/MyCard';
import TypographyWithButton from '../common/TypographyWithButton';
import CheckBoxWithLabel from '../common/CheckBoxWithLabel';
import TypographyWithTimePicker from '../common/TypographyWithTimePicker';

const FanControl = ({
    remoteControl,
    fanControl,
    onWorkChange,
    onAutoWorkChange,
    onAutoWorkStartTimeChange,
    onAutoWorkEndTimeChange
}) => {
    return (
        <div style={{ width: '100%'}} >
            <MyCard sx={{ width: '100%' }}>
                <TypographyWithButton
                    text='작동하기/중단하기'
                    buttonText={fanControl.workButtonText}
                    disabled={!remoteControl || fanControl.autoWork}
                    onClick={onWorkChange}
                    sx={{ mt: 1.5 }}
                />
                <CheckBoxWithLabel
                    text='자동 작동하기/중단하기'
                    checked={fanControl.autoWork}
                    disabled={!remoteControl}
                    onChange={onAutoWorkChange}
                    sx={{ mt: 1.5 }}
                />
                <TypographyWithTimePicker
                    text='작동하는 시각'
                    disabled={!fanControl.autoWork}
                    value={fanControl.autoWorkStartTime}
                    onChange={onAutoWorkStartTimeChange}
                />
                <TypographyWithTimePicker
                    text='중단하는 시각'
                    disabled={!fanControl.autoWork}
                    value={fanControl.autoWorkEndTime}
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
                <Typography variant='h6' sx={{ mt: 6 }}>{fanControl.status}</Typography>
            </Box>
        </div>
    )
};

export default FanControl;