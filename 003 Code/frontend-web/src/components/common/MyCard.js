import { Card, CardContent } from '@mui/material';

const MyCard = ({ sx, children }) => {
    return (
        <Card sx={sx}>
            <CardContent sx={{ margin: 2 }}>
                {children}
            </CardContent>
        </Card>
    );
};

export default MyCard;