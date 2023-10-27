import { NavLink } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import './ControlTabs.css';

const ControlTabs = ({ tabNumber }) => {
    const activeStyle = {
        color: '#2196f3'

    };

    return (
        <Box sx={{ width: '100%', position: 'fixed', bottom: 10 }}>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='center'
                spacing={3}
            >
                <NavLink
                    to={process.env.REACT_APP_CONTROL_LED_PATH}
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                    LED
                </NavLink>
                <NavLink
                    to={process.env.REACT_APP_CONTROL_WATERING_SYSTEM_PATH}
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                    관수 시스템
                </NavLink>
                <NavLink
                    to={process.env.REACT_APP_CONTROL_FAN_PATH}
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                    환기팬
                </NavLink>
                <NavLink
                    to={process.env.REACT_APP_CONTROL_CENTER_DOOR_PATH}
                    style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                    중앙문
                </NavLink>
            </Stack>
        </Box>
    )
};

export default ControlTabs;