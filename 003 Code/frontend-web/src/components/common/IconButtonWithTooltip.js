import { Tooltip, IconButton } from '@mui/material';

const IconButtonWithTootip = ({ title, onClick, children }) => {
    return (
        <Tooltip title={title}>
            <IconButton
                size='medium'
                color="secondary"
                onClick={onClick}
            >
                {children}
            </IconButton>
        </Tooltip>
    );
};

export default IconButtonWithTootip;