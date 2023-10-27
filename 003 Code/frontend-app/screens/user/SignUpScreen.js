import React from 'react';
import { View, StyleSheet } from 'react-native';
import SignUp from '../../containers/user/SignUp';
import Snackbar from '../../containers/common/Snackbar';

function SignUpScreen() {
    return (
        <View style={styles.block}>
            <SignUp />
            <Snackbar />
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