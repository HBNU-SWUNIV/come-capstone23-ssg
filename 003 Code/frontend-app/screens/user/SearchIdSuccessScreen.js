import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenName from '../../components/common/ScreenName';
import SearchIdSuccess from '../../containers/user/SearchIdSuccess';

function SearchIdSuccessScreen() {
    return (
        <View style={styles.block}>
            <ScreenName>아아디 찾기 성공!</ScreenName>
            <SearchIdSuccess />
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

export default SearchIdSuccessScreen;