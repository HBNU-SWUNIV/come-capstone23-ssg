import { Grid, TextField, Button } from '@mui/material';

const TextFieldWithButton = ({ textFieldLabel, textFieldValue, textFieldDisabled, textFieldOnChange, buttonDisabled, buttonText, buttonOnClick }) => {
    return (
        <Grid item xs={12}>
            <Grid container columnSpacing={1.5}>
                <Grid item xs={8}>
                    <TextField
                        label={textFieldLabel}
                        value={textFieldValue}
                        fullWidth
                        color="info"
                        disabled={textFieldDisabled}
                        onChange={textFieldOnChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        disabled={buttonDisabled}
                        color="secondary"
                        fullWidth
                        onClick={buttonOnClick}
                        sx={{ height: '100%' }}
                    >
                        {buttonText}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TextFieldWithButton;