import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import GreyButton from '../common/GreyButton';

function SearchIdSuccess({
    id,
    goSearchPassword,
    goLogIn
}) {
    return (
        <View style={styles.block}>
            <View style={styles.texts}>
                <Text style={[styles.text, styles.textMargin]} variant='titleMedium'>
                    찾으시는 아이디는 다음 아래와 같습니다.
                </Text>
                <Text style={styles.text} variant='bodyLarge'>
                    {id}
                </Text>
            </View>
            <GreyButton style={styles.searchPasswordButton} onPress={goSearchPassword}>비밀번호 찾기</GreyButton>
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
    texts: {
        felxDirection: 'column',
        alignItems: 'center',
        marginBottom: 40
    },
    text: {
        color: '#000000'
    },
    textMargin: {
        marginBottom: 15
    },
    searchPasswordButton: {
        marginBottom: 10
    },
    loginButton: {
        borderRadius: 5
    }
});

export default SearchIdSuccess;