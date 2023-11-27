import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import ImageWithText from '../../components/common/ImageWithText';
import wave from '../../assets/emoji/wave.png';

function SignUpSuccessScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('LogIn')
        }, 2000);
    }, []);

    return <ImageWithText image={wave} text='회원가입 성공!'/>;
}

export default SignUpSuccessScreen;