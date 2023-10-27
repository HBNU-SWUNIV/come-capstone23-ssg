import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenName from '../../components/common/ScreenName';
import SearchFailure from '../../containers/user/SearchFailure';

function SearchIdFailureScreen() {
    return (
        <View style={styles.block}>
            <ScreenName>아아디 찾기 실패</ScreenName>
            <SearchFailure />
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

export default SearchIdFailureScreen;