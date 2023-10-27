import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenName from '../../components/common/ScreenName';
import SearchPasswordSuccess from '../../containers/user/SearchPasswordSuccess';

function SearchPasswordSuccessScreen() {
    return (
        <View style={styles.block}>
            <ScreenName>비밀번호 찾기 성공!</ScreenName>
            <SearchPasswordSuccess />
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

export default SearchPasswordSuccessScreen;