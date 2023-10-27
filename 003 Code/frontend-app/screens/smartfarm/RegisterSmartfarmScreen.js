import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterSmartfarm from '../../containers/smartfarm/RegisterSmartfarm';
import Snackbar from '../../containers/common/Snackbar';

function RegisterSmartfarmScreen() {
    return (
        <View style={styles.block}>
            <RegisterSmartfarm />
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

export default RegisterSmartfarmScreen;