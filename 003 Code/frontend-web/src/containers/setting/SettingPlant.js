import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SettingPlantComponent from '../../components/setting/SettingPlant';
import { changeName, changeDay, modifyPlantInitialize, removePlantInitialize, getPlant, modifyPlant, removePlant } from '../../modules/smartfarm/plant';

const SettingPlant = () => {
    const token = useSelector(state => state.user.token);
    const exist = useSelector(state => state.plant.exist);
    const name = useSelector(state => state.plant.name);
    const day = useSelector(state => state.plant.day);
    const removePlantSuccess = useSelector(state => state.plant.removePlantSuccess);

    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onNameChange = useCallback(e => dispatch(changeName(e.target.value)), [dispatch]);
    const onDayChange = useCallback(e => dispatch(changeDay(e.target.value)), [dispatch]);

    const onModifyClick = () => {
        dispatch(modifyPlant({
            token,
            name,
            day
        }));
    };
    const onOpenClick = () => {
        setOpen(true);
    };
    const onYesClick = () => {
        dispatch(removePlant(token));
    };
    const onNoClick = () => {
        setOpen(false);
    };
    const goBack = () => {
        navigate(process.env.REACT_APP_SETTING_PATH);
    };

    useEffect(() => {
        if (exist) {
            dispatch(getPlant(token));
        }
    }, [exist, dispatch, token]);

    useEffect(() => {
        if (!exist) {
            navigate(process.env.REACT_APP_REGISTER_PLANT_PATH);
        }
    }, [exist, navigate]);

    useEffect(() => {
        if (removePlantSuccess) {
            navigate(process.env.REACT_APP_REMOVE_PLANT_SUCCESS_PATH);
            dispatch(removePlantInitialize());
        }

        return () => {
            if (!removePlantSuccess) {
                dispatch(modifyPlantInitialize());
            }
        }
    }, [removePlantSuccess, navigate, dispatch]);

    return (
        <SettingPlantComponent
            name={name}
            day={day}
            open={open}
            onNameChange={onNameChange}
            onDayChange={onDayChange}
            onModifyClick={onModifyClick}
            onOpenClick={onOpenClick}
            onYesClick={onYesClick}
            onNoClick={onNoClick}
            goBack={goBack}
        />
    );
};

export default React.memo(SettingPlant);