import { Typography } from '@mui/material';
import ContainerBox from '../../components/common/ContainerBox';
import LogIn from '../../containers/user/LogIn';
import Snackbar from '../../containers/common/Snackbar';

const LogInPage = () => {
    return (
        <>
            <ContainerBox maxWidth="xs">
                <Typography
                    variant="h3"
                    sx={{
                        mt: 4,
                        mb: 3,
                        fontWeight: 'bold',
                        color: '#4caf80',
                        textAlign: 'center'
                    }}
                >
                    Smart Farm
                </Typography>
                <LogIn />
            </ContainerBox>
            <Snackbar />
        </>
    );
};

export default LogInPage;