// SERVER: 스마트팜 관수 시스템 상태 및 제어 정보 요청

import { Box, Typography } from '@mui/material';
import MyCard from '../common/MyCard';
import TypographyWithButton from '../common/TypographyWithButton';
import TypographyWithNumberPicker from '../common/TypographyWithNumberPicker';
import CheckBoxWithLabel from '../common/CheckBoxWithLabel';
import TypographyWithTimeNumberPicker from '../common/TypographyWithTimeNumberPicker';

const WateringSystemControl = ({
    remoteControl,
    wateringSystemControl,
    onWorkChange,
    onWorkTimeChange,
    onAutoWorkChange,
    onAutoWorkPeriodChange
}) => {
    const workTimeNumbers = [
        8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22
    ];

    return (
        <div style={{ width: '100%'}} >
            <MyCard sx={{ width: '100%' }}>
                <TypographyWithButton
                    text='물 주기/중단하기'
                    buttonText={wateringSystemControl.workButtonText}
                    disabled={!remoteControl || wateringSystemControl.work || wateringSystemControl.autoWork}
                    onClick={onWorkChange}
                    sx={{ mt: 1.5 }}
                />
                <TypographyWithNumberPicker
                    text='물 주는 시간'
                    numbers={workTimeNumbers}
                    value={wateringSystemControl.workTime}
                    disabled={!remoteControl || wateringSystemControl.work}
                    onChange={onWorkTimeChange}
                    sx={{ mt: 1.5 }}
                />
                <CheckBoxWithLabel
                    text='자동 물 주기/중단하기'
                    checked={wateringSystemControl.autoWork}
                    disabled={!remoteControl}
                    onChange={onAutoWorkChange}
                    sx={{ mt: 1.5 }}
                />
                <TypographyWithTimeNumberPicker
                    text='물 주기'
                    disabled={!wateringSystemControl.autoWork}
                    period={wateringSystemControl.autoWorkPeriod}
                    onPeriodChange={onAutoWorkPeriodChange}
                    time={wateringSystemControl.workTime}
                    sx={{ mt: 1.5 }}
                />
            </MyCard>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant='h6' sx={{ mt: 6 }}>{wateringSystemControl.status}</Typography>
            </Box>
        </div>
    )
};

export default WateringSystemControl;