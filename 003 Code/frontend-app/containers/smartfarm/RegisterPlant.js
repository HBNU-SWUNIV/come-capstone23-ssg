import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import RegisterPlantComponent from '../../components/smartfarm/RegisterPlant';
import { changeName, changeDay, registerPlantInitialize, registerPlant } from '../../slices/smartfarm/plant';

function RegisterPlant() {
    const name = useSelector(state => state.plant.name);
    const day = useSelector(state => state.plant.day);
    const registerPlantSuccess = useSelector(state => state.plant.registerPlantSuccess);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onNameChange = useCallback(e => dispatch(changeName(e)), [dispatch]);
    const onDayChange = useCallback(e => dispatch(changeDay(e)), [dispatch]);

    const clear = () => {dispatch(registerPlantInitialize())};

    const onRegisterPlant = () => {
        if (Number(day) < 0) {
            console.log('작물을 키운 날짜를 0보다 큰 숫자로 입력해주세요');
            return;
        }

        if (name === '') {
            dispatch(changeName('새싹이'));
        }
        
        dispatch(registerPlant({name, day}));
        
    };

    const goBack = () => {
        navigation.pop();
        clear();
    };

    useEffect(() => {
        if (registerPlantSuccess) {
            navigation.replace('RegisterPlantSuccess');
            clear();
        }
    }, [registerPlantSuccess, navigation, clear]);

    return (
        <RegisterPlantComponent
            name={name}
            day={day}
            onNameChange={onNameChange}
            onDayChange={onDayChange}
            onRegisterPlant={onRegisterPlant}
            goBack={goBack}
        />
    );
}

export default React.memo(RegisterPlant);