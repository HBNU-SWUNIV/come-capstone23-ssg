import React from 'react';
import SettingPersonalInformation from '../../containers/setting/SettingPersonalInformation';
import Snackbar from '../../containers/common/Snackbar';

function SettingPersonalInformationScreen() {
    return (
        <>
            <SettingPersonalInformation />
            <Snackbar />
        </>
    );
}

export default SettingPersonalInformationScreen;