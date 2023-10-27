import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterPlant from '../../containers/smartfarm/RegisterPlant';
import Snackbar from '../../containers/common/Snackbar';

function RegisterPlantScreen() {
    return (
        <View style={styles.block}>
            <RegisterPlant />
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

export default RegisterPlantScreen;