import React, { useState } from 'react';
import TextFieldPasswordComponent from '../../components/common/TextFieldPassword';

const TextFieldPassword = ({ inputLabel, disabled, value, onChange, id, error }) => {
    const [show, setShow] = useState(false);

    const onMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const onClick = () => {
        setShow(!show);
    }

    return (
        <TextFieldPasswordComponent
            id={id}
            error={error}
            inputLabel={inputLabel}
            disabled={disabled}
            value={value}
            onChange={onChange}
            showPassword={show}
            onClickShowPassword={onClick}
            onMouseDownPassword={onMouseDownPassword}
        />
    );
};

export default React.memo(TextFieldPassword);