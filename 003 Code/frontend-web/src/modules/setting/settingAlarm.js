import { createAction, handleActions } from 'redux-actions';

const CHANGE_MODIFY_PERSONAL_INFORMATION = 'settingAlarm/CHANGE_MODIFY_PERSONAL_INFORMATION';
const CHANGE_LOG_IN_OUT = 'settingAlarm/CHANGE_LOG_IN_OUT';
const CHANGE_MODIFY_SMARTFARM = 'settingAlarm/CHANGE_MODIFY_SMARTFARM';
const CHANGE_AUTO_CONTROL_SMARTFARM = 'settingAlarm/CHANGE_AUTO_CONTROL_SMARTFARM';
const CHANGE_WARN_SMARTFARM = 'settingAlarm/CHANGE_WARN_SMARTFARM';
const CHANGE_MODIFY_PLANT = 'settingAlarm/CHANGE_MODIFY_PLANT';
const CHANGE_HARVEST_PLANT = 'settingAlarm/CHANGE_HARVEST_PLANT';

export const changeModifyPersonalInformation = createAction(CHANGE_MODIFY_PERSONAL_INFORMATION, modifyPersonalInformation => modifyPersonalInformation);
export const changeLogInOut = createAction(CHANGE_LOG_IN_OUT, logInOut => logInOut);
export const changeModifySmartfarm = createAction(CHANGE_MODIFY_SMARTFARM, modifySmartfarm => modifySmartfarm);
export const changeAutoControlSmartfarm = createAction(CHANGE_AUTO_CONTROL_SMARTFARM, autoControlSmartfarm => autoControlSmartfarm);
export const changeWarnSmartfarm = createAction(CHANGE_WARN_SMARTFARM, warnSmartfarm => warnSmartfarm);
export const changeModifyPlant = createAction(CHANGE_MODIFY_PLANT, modifyPlant => modifyPlant);
export const changeHarvestPlant = createAction(CHANGE_HARVEST_PLANT, harvestPlant => harvestPlant);

const initialState = {
    modifyPersonalInformation: false,
    logInOut: false,
    modifySmartfarm: false,
    autoControlSmartfarm: false,
    warnSmartfarm: false,
    modifyPlant: false,
    harvestPlant: false
};

const settingAlarm = handleActions(
    {
        [CHANGE_MODIFY_PERSONAL_INFORMATION]: (state, { payload: modifyPersonalInformation }) => ({
            ...state,
            modifyPersonalInformation: modifyPersonalInformation
        }),
        [CHANGE_LOG_IN_OUT]: (state, { payload: logInOut }) => ({
            ...state,
            logInOut: logInOut
        }),
        [CHANGE_MODIFY_SMARTFARM]: (state, { payload: modifySmartfarm }) => ({
            ...state,
            modifySmartfarm: modifySmartfarm
        }),
        [CHANGE_AUTO_CONTROL_SMARTFARM]: (state, { payload: autoControlSmartfarm }) => ({
            ...state,
            autoControlSmartfarm: autoControlSmartfarm
        }),
        [CHANGE_WARN_SMARTFARM]: (state, { payload: warnSmartfarm }) => ({
            ...state,
            warnSmartfarm: warnSmartfarm
        }),
        [CHANGE_MODIFY_PLANT]: (state, { payload: modifyPlant }) => ({
            ...state,
            modifyPlant: modifyPlant
        }),
        [CHANGE_HARVEST_PLANT]: (state, { payload: harvestPlant }) => ({
            ...state,
            harvestPlant: harvestPlant
        })
    },
    initialState
);

export default settingAlarm;