import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modifyPersonalInformation: false,
    logInOut: false,
    modifySmartfarm: false,
    autoControlSmartfarm: false,
    warnSmartfarm: false,
    modifyPlant: false,
    harvestPlant: false
};

const settingAlarmSlice = createSlice({
    name: 'settingAlarm',
    initialState,
    reducers: {
        changeModifyPersonalInformation(state) {
            state.modifyPersonalInformation = !state.modifyPersonalInformation
        },
        changeLogInOut (state) {
            state.logInOut = !state.logInOut
        },
        changeModifySmartfarm (state) {
            state.modifySmartfarm = !state.modifySmartfarm
        },
        changeAutoControlSmartfarm (state) {
            state.autoControlSmartfarm = !state.autoControlSmartfarm
        },
        changeWarnSmartfarm (state) {
            state.warnSmartfarm = !state.warnSmartfarm
        },
        changeModifyPlant (state) {
            state.modifyPlant = !state.modifyPlant
        },
        changeHarvestPlant (state) {
            state.harvestPlant = !state.harvestPlant
        }
    }
});

export default settingAlarmSlice.reducer;
export const {
    changeModifyPersonalInformation,
    changeLogInOut,
    changeModifySmartfarm,
    changeAutoControlSmartfarm,
    changeWarnSmartfarm,
    changeModifyPlant,
    changeHarvestPlant
}  = settingAlarmSlice.actions;