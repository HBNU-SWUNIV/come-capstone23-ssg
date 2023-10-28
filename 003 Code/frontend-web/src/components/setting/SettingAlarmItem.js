import { Stack, Typography } from '@mui/material';
import IOSSwitch from '../common/IOSSwitch';

const SettingAlarmItem = ({ text, disabled, checked, onChange, sx }) => {
    return (
		<Stack
			direction='row'
			alignItems='center'
			justifyContent='space-between'
            sx={{ mt: 1, mb: 1 }}
		>
			<Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>{text}</Typography>
			<IOSSwitch
                color='info'
                sx={{ m: 1 }}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
            />
		</Stack>
    )
}

export default SettingAlarmItem;