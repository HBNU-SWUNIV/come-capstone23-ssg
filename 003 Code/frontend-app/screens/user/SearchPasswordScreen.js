import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchPassword from '../../containers/user/SearchPassword';

function SearchPasswordScreen() {
    return (
        <View style={styles.block}>
            <SearchPassword />
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

export default SearchPasswordScreen;