import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenName from '../../components/common/ScreenName';
import SearchFailure from '../../containers/user/SearchFailure';

function SearchPasswordFailureScreen() {
    return (
        <View style={styles.block}>
            <ScreenName>비밀번호 찾기 실패</ScreenName>
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

export default SearchPasswordFailureScreen;