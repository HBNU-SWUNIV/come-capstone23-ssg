import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../../components/common/Logo';
import LogIn from '../../containers/user/LogIn';

function LogInScreen() {
    return (
        <View style={styles.block}>
            <Logo />
            <LogIn />
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    }
});

export default LogInScreen;