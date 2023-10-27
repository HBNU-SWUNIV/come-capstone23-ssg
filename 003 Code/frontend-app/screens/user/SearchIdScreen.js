import React from 'react';
import { View, StyleSheet } from 'react-native';
import Verify from '../../containers/user/Verify';

function SearchIdScreen() {
    return (
        <View style={styles.block}>
            <Verify />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default SearchIdScreen;