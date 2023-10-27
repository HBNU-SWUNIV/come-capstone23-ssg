import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ImageWithText from '../../components/common/ImageWithText';
import plant from '../../assets/icon/plant.png';

function RemovePlantSuccessScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {navigation.popToTop()}, 2000);
    }, []);

    return <ImageWithText image={plant} text='작물 삭제 완료!'/>;
}

export default RemovePlantSuccessScreen;