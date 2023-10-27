import { Container, Box } from '@mui/material';

const ContainerBox = ({ maxWidth, children }) => {
    return (
        <Container component="main" maxWidth={maxWidth}>
            <Box
                sx={{
                    mt: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {children}
            </Box>
        </Container>
    );
};

export default ContainerBox;