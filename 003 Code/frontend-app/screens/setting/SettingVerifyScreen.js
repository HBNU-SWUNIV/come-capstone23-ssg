import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenName from '../../components/common/ScreenName';
import SettingVerify from '../../containers/setting/SettingVerify';
import Snackbar from '../../containers/common/Snackbar';

function SettingVerifyScreen() {
    return (
        <View style={styles.block}>
            <ScreenName>비밀번호 확인</ScreenName>
            <SettingVerify />
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

export default SettingVerifyScreen;