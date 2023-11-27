import React from 'react';
import { View, StyleSheet } from 'react-native';
import SignUp from '../../containers/user/SignUp';

function SignUpScreen() {
    return (
        <View style={styles.block}>
            <SignUp />
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default SignUpScreen;