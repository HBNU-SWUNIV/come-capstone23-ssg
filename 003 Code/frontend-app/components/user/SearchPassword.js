import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import OutlineTextInput from '../common/OutlineTextInput';
import GreyButton from '../common/GreyButton';

function SearchPassword({
    name,
    id,
    phoneNumber,
    onNameChange,
    onIdChange,
    onPhoneNumberChange,
    goNext,
    goBack
}) {
    var phoneNumberPattern = /01[016789]-[^0][0-9]{2,3}-[0-9]{4}/;

    return (
        <KeyboardAvoidingView style={styles.block}>
            <OutlineTextInput
                style={styles.textInput}
                label='이름'
                value={name}
                onChangeText={onNameChange}
            />
            <OutlineTextInput
                style={styles.textInput}
                label='아이디'
                disabled={name === ''}
                value={id}
                onChangeText={onIdChange}
            />
            <OutlineTextInput
                style={styles.phoneNumberTextInput}
                error={phoneNumber !== '' && !phoneNumberPattern.test(phoneNumber)}
                label='휴대전화번호'
                helperText="XXX-XXXX-XXXX(XXX-XXX-XXXX) 형식으로 입력해주세요"
                value={phoneNumber}
                onChangeText={onPhoneNumberChange}
            />
            <GreyButton
                style={styles.nextButton}
                disabled={name === '' || id === '' || !phoneNumberPattern.test(phoneNumber)}
                onPress={goNext}
            >
                다음
            </GreyButton>
            <GreyButton onPress={goBack}>취소</GreyButton>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    block: {
        marginRight: 50,
        marginLeft: 50
    },
    textInput: {
        marginBottom: 15
    },
    phoneNumberTextInput: {
        marginBottom: 40
    },
    nextButton: {
        marginBottom: 10
    }
});

export default SearchPassword;