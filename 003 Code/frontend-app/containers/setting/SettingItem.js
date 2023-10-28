import React from 'react';
import { useNavigation } from '@react-navigation/native';
import SettingItemComponent from '../../components/setting/SettingItem';

function SettingItem({ setting }) {
    const navigation = useNavigation();

    const go = () => {
        if (setting.destination === 'SettingVerify') {
            navigation.navigate('SettingVerify', {
                title: setting.title,
                destination: setting.nextDestination
            });
        } else {
            navigation.navigate(setting.destination);
        }
    };

    return (
        <SettingItemComponent
            setting={setting}
            go={go}
        />
    );
}

export default React.memo(SettingItem);