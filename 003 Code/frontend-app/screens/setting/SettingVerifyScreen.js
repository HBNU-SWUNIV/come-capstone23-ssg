import React from 'react';
import { View, StyleSheet } from 'react-native';
import ScreenName from '../../components/common/ScreenName';
import SettingVerify from '../../containers/setting/SettingVerify';

function SettingVerifyScreen() {
    return (
        <View style={styles.block}>
            <ScreenName>비밀번호 확인</ScreenName>
            <SettingVerify />
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