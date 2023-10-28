import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import TextInputWithButton from '../common/TextInputWithButton';
import GreyButton from '../common/GreyButton';

function RegisterSmartfarm({
    smartfarmNumber,
    checkSmartfarmNumberSuccess,
    onSmartfarmNumberChange,
    onCheckSmartfarmNumber,
    onRegisterSmartfarm,
    goBack
}) {
    return (
        <View style={styles.block}>
            <TextInputWithButton
                style={styles.textInputWithButton}
                textInputLabel='스마트팜 고유번호'
                buttonChildren='중복 확인'
                value={smartfarmNumber}
                onChangeText={onSmartfarmNumberChange}
                buttonDisabled={smartfarmNumber === '' ? true : false}
                onPress={onCheckSmartfarmNumber}
            />
            <Button
                style={styles.button}
                mode='contained'
                disabled={!checkSmartfarmNumberSuccess}
                onPress={onRegisterSmartfarm}
            >
                스마트팜 등록
            </Button>
            <GreyButton onPress={goBack}>취소</GreyButton>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        marginRight: 50,
        marginLeft: 50
    },
    textInputWithButton: {
        marginBottom: 40
    },
    button: {
        borderRadius: 5,
        marginBottom: 10
    }
});

export default RegisterSmartfarm;