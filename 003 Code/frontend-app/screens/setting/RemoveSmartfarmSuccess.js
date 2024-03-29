import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ImageWithText from '../../components/common/ImageWithText';
import greenhouse from '../../assets/icon/greenhouse.png';

function RemoveSmartfarmSuccessScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {navigation.popToTop()}, 2000);
    }, []);

    return <ImageWithText image={greenhouse} text='스마트팜 삭제 완료!'/>;
}

export default RemoveSmartfarmSuccessScreen;