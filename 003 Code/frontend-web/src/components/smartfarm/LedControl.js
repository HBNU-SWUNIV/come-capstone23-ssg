// SERVER: 스마트팜 LED 상태 및 제어 정보 요청

import { Box, Typography } from '@mui/material';
import MyCard from '../common/MyCard';
import TypographyWithButton from '../common/TypographyWithButton';
import CheckBoxWithLabel from '../common/CheckBoxWithLabel';
import TypographyWithTimePicker from '../common/TypographyWithTimePicker';

const LedControl = ({
    remoteControl,
    ledControl,
    onWorkChange,
    onAutoWorkChange,
    onAutoWorkStartTimeChange,
    onAutoWorkEndTimeChange
}) => {
    return (
        <div style={{ width: '100%'}} >
            <MyCard sx={{ width: '100%' }}>
                <TypographyWithButton
                    text='켜기/끄기'
                    buttonText={ledControl.workButtonText}
                    disabled={!remoteControl || ledControl.autoWork}
                    onClick={onWorkChange}
                    sx={{ mt: 1.5 }}
                />
                <CheckBoxWithLabel
                    text='자동 켜기/끄기'
                    checked={ledControl.autoWork}
                    disabled={!remoteControl}
                    onChange={onAutoWorkChange}
                    sx={{ mt: 1.5 }}
                />
                <TypographyWithTimePicker
                    text='켜는 시각'
                    disabled={!ledControl.autoWork}
                    value={ledControl.autoWorkStartTime}
                    onChange={onAutoWorkStartTimeChange}
                />
                <TypographyWithTimePicker
                    text='끄는 시각'
                    disabled={!ledControl.autoWork}
                    value={ledControl.autoWorkEndTime}
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
                <Typography variant='h6' sx={{ mt: 6 }}>{ledControl.status}</Typography>
            </Box>
        </div>
    );
};

export default LedControl;