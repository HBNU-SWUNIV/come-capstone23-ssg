import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import GreyButton from '../common/GreyButton';

function SearchFailure({
    goSearchId,
    goSearchPassword,
    goLogIn
}) {
    return (
        <View style={styles.block}>
            <Text style={styles.text} variant='titleMedium'>
                입력하신 정보로 가입된 이력이 없습니다.
            </Text>
            <GreyButton style={styles.button} onPress={goSearchId}>아이디 찾기</GreyButton>
            <GreyButton style={styles.button} onPress={goSearchPassword}>비밀번호 찾기</GreyButton>
            <Button
                style={styles.loginButton}
                mode='contained'
                onPress={goLogIn}
            >
                로그인
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        marginTop: 45,
        marginRight: 50,
        marginLeft: 50
    },
    text: {
        color: '#000000',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        marginBottom: 10
    },
    loginButton: {
        borderRadius: 5
    }
});

export default SearchFailure;