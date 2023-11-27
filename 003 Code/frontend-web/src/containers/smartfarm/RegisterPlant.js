import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterPlantComponent from '../../components/smartfarm/RegisterPlant';
import { changeName, changeDay, registerPlantInitialize, registerPlantSuccessInitialize, registerPlant } from '../../modules/smartfarm/plant';

const RegisterPlant = () => {
    const token = useSelector(state => state.user.token);
    const name = useSelector(state => state.plant.name);
    const day = useSelector(state => state.plant.day);
    const registerPlantSuccess = useSelector(state => state.plant.registerPlantSuccess);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNameChange = useCallback(e => dispatch(changeName(e.target.value)), [dispatch]);
    const onDayChange = useCallback(e => dispatch(changeDay(e.target.value)), [dispatch]);

    const onRegisterClick = () => {
        if (name === '') {
            dispatch(changeName('새싹이'));
        }

        dispatch(registerPlant({
            token,
            name,
            day
        }));
    };
    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (registerPlantSuccess) {
            navigate(process.env.REACT_APP_REGISTER_PLANT_SUCCESS_PATH);
        }

        return () => {
            if (registerPlantSuccess === false) {
                dispatch(registerPlantInitialize());
            } else if (registerPlantSuccess) {
                dispatch(registerPlantSuccessInitialize());
            }
        }
    }, [registerPlantSuccess, navigate, dispatch]);

    return (
        <RegisterPlantComponent
            name={name}
            day={day}
            onNameChange={onNameChange}
            onDayChange={onDayChange}
            onRegisterClick={onRegisterClick}
            goBack={goBack}
        />
    );
};

export default React.memo(RegisterPlant);