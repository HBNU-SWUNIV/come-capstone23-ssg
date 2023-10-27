import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import SettingPlantComponent from '../../components/setting/SettingPlant';
import {
    changeName,
    changeDay,
    modifyPlantInitialize,
    removePlantInitialize,
    modifyPlant,
    removePlant
} from '../../slices/smartfarm/plant';

function SettingPlant() {
    const token = useSelector(state => state.user.token);
    const name = useSelector(state => state.plant.name);
    const day = useSelector(state => state.plant.day);
    const removePlantSuccess = useSelector(state => state.plant.removePlantSuccess);

    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onNameChange = useCallback(e => dispatch(changeName(e)), [dispatch]);
    const onDayChange = useCallback(e => dispatch(changeDay(e)), [dispatch]);

    const clear = () => {dispatch(modifyPlantInitialize())};

    const onModify = () => {
        dispatch(modifyPlant({
            token,
            name,
            day
        }));
    };

    const onOpen = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const onOkay = () => {
        dispatch(removePlant(token));
    };

    const goBack = () => {
        navigation.pop();
        clear();
    };

    useEffect(() => {
        if (removePlantSuccess) {
            setVisible(false);
            navigation.replace('RemovePlantSuccess');
            dispatch(removePlantInitialize());
        }
    }, [removePlantSuccess, setVisible, navigation, dispatch]);

    return (
        <SettingPlantComponent
            name={name}
            day={day}
            visible={visible}
            onNameChange={onNameChange}
            onDayChange={onDayChange}
            onModify={onModify}
            onOpen={onOpen}
            onClose={onClose}
            onOkay={onOkay}
            goBack={goBack}
        />
    );
}

export default React.memo(SettingPlant);
