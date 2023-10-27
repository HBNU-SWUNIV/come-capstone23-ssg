import { FormControlLabel, Checkbox } from "@mui/material";

const CheckBoxWithLabel = ({ disabled, checked, onChange, text, sx }) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    disabled={disabled}
                    checked={checked}
                    onChange={onChange}
                    color='info'
                />
            }
            label={text}
            sx={sx}
        />
    );
};

export default CheckBoxWithLabel;