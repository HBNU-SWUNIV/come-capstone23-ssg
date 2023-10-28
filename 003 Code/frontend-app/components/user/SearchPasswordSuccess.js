import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

function SearchPasswordSuccess({ password, goLogIn }) {
    return (
        <View style={styles.block}>
            <View style={styles.texts}>
                <Text style={[styles.text, styles.textMargin]} variant='titleMedium'>
                    임시 비밀번호는 다음 아래와 같습니다. 로그인 후 비밀번호를 다시 설정해주시기 바랍니다.
                </Text>
                <Text style={styles.text} variant='bodyLarge'>
                    {password}
                </Text>
            </View>
            <Button
                style={styles.button}
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
    button: {
        borderRadius: 5
    }
});

export default SearchPasswordSuccess;