import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterPlant from '../../containers/smartfarm/RegisterPlant';

function RegisterPlantScreen() {
    return (
        <View style={styles.block}>
            <RegisterPlant />
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