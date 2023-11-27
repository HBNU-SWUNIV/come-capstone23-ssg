import { createAction, createSlice } from '@reduxjs/toolkit';
import { select, put, takeLatest } from 'redux-saga/effects';
import createControlRequestSaga from '../../assets/api/createControlRequestSaga';
import createRequestSaga from '../../assets/api/createRequestSaga';
import { changeRemoteControl as changeLedRemoteControl } from './ledControl';
import { changeRemoteControl as changeWateringSystemRemoteControl } from './wateringSystemControl';
import { changeRemoteControl as changeFanRemoteControl } from './fanControl';
import { changeRemoteControl as changeCenterDoorRemoteControl } from './centerDoorControl';
import { removePlant } from './plant';
import { initializeSaga, success, showSnackbar } from '../common';
import { check, checkSuccess } from '../user/user';
import * as WebAPI from '../../assets/api/webApi';


const CHANGE_REMOTE_CONTROL = 'smartfarm/changeRemoteControl';
const CHECK_SMARTFARM_NUMBER = 'smartfarm/checkSmartfarmNumber';
const REGISTER_SMARTFARM = 'smartfarm/registerSmartfarm';
const GET_SMARTFARM = 'smartfarm/getSmartfarm';
const MODIFY_SMARTFARM = 'smartfarm/modifySmartfarm';
const REMOVE_SMARTFARM = 'smartfarm/removeSmartfarm';

export const changeRemoteControl = createAction(CHANGE_REMOTE_CONTROL);
export const checkSmartfarmNumber = createAction(CHECK_SMARTFARM_NUMBER);
export const registerSmartfarm = createAction(REGISTER_SMARTFARM);
export const getSmartfarm = createAction(GET_SMARTFARM);
export const modifySmartfarm = createAction(MODIFY_SMARTFARM);
export const removeSmartfarm = createAction(REMOVE_SMARTFARM);

const initialState = {
    exist: null,

    smartfarmNumber: '',
    remoteControl: false,
    temperature: 0,
    humidity: 0,
    waterTemperature: 0,
    waterLevel: 0,

    checkSmartfarmNumberSuccess: null,
    registerSmartfarmSuccess: null,
    modifySmartfarmSuccess: null,
    removeSmartfarmSuccess: null
};

const smartfarmSlice = createSlice({
    name: 'smartfarm',
    initialState,
    reducers: {
        changeExist(state) {
            state.exist = !state.exist
        },
        changeSmartfarmNumber(state, action) {
            state.smartfarmNumber = action.payload
        },
        changeRemoteControlSuccess(state) {
            state.remoteControl = !state.remoteControl
        },
        checkSmartfarmNumberSuccess(state) {
            state.checkSmartfarmNumberSuccess = true
        },
        registerSmartfarmInitialize(state) {
            state.smartfarmNumber = ''
            state.checkSmartfarmNumberSuccess = null
            state.registerSmartfarmSuccess = null
        },
        registerSmartfarmSuccess(state) {
            state.exist = true
            state.registerSmartfarmSuccess = true
        },
        getSmartfarmSuccess(state, action) {
            state.smartfarmNumber = action.payload.smartfarm
        },
        modifySmartfarmInitialize(state) {
            state.modifySmartfarmSuccess = null
        },
        modifySmartfarmSuccess(state) {
            state.modifySmartfarmSuccess = true
        },
        removeSmartfarmInitialize(state) {
            state.smartfarmNumber = null
            state.removeSmartfarmSuccess = null
        },
        removeSmartfarmSuccess(state) {
            state.exist = false
            state.smartfarmNumber = ''
            state.remoteControl = false
            state.temperature = 0
            state.humidity = 0
            state.waterTemperature = 0
            state.waterLevel = 0
            state.removeSmartfarmSuccess = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkSuccess, (state, action) => {
                state.exist = action.payload.smartfarm_check
                state.smartfarmNumber = action.payload.smartfarm_check ? action.payload.smartfarm : ''
                state.remoteControl = action.payload.smartfarm_check ? action.payload.remotepower : false
                state.temperature = action.payload.smartfarm_check ? action.payload.temperature : 0
                state.waterTemperature = action.payload.smartfarm_check ? action.payload.watertemperature : 0
                state.waterLevel = action.payload.smartfarm_check ? action.payload.waterlevelvoltage : 0
            })
    }
});

const changeRemoteControlSaga = createControlRequestSaga(CHANGE_REMOTE_CONTROL, WebAPI.remoteControl, 'remoteControl');
const checkSmartfarmNumberSaga = createRequestSaga(CHECK_SMARTFARM_NUMBER, WebAPI.checkSmartfarmNumber);
const registerSmartfarmSaga = createRequestSaga(REGISTER_SMARTFARM, WebAPI.registerSmartfarm);
const getSmartfarmSaga = createRequestSaga(GET_SMARTFARM, WebAPI.getSmartfarm);
const modifySmartfarmSaga = createRequestSaga(MODIFY_SMARTFARM, WebAPI.modifySmartfarm);
const removeSmartfarmSaga = createRequestSaga(REMOVE_SMARTFARM, WebAPI.removeSmartfarm);

function* changeRemoteControlSuccessSaga() {
    const remoteControl = yield select(state => state.smartfarm.remoteControl);

    yield put(changeLedRemoteControl(remoteControl));
    yield put(changeWateringSystemRemoteControl(remoteControl));
    yield put(changeFanRemoteControl(remoteControl));
    yield put(changeCenterDoorRemoteControl(remoteControl));
}

function* checkSaga() {
    const token = yield select(state => state.user.token);

    yield put(check(token));
}

function* removeSmartfarmSuccessSaga() {
    yield put(removePlant());
    checkSaga();
}

function* modifySmartfarmSuccessSaga() {
    yield put(success());
    yield put(showSnackbar('스마트팜을 성공적으로 수정했습니다.'));
    checkSaga();
}

export function* smartfarmSaga() {
    yield takeLatest(smartfarmSlice.actions.registerSmartfarmInitialize, initializeSaga);
    yield takeLatest(smartfarmSlice.actions.modifySmartfarmInitialize, initializeSaga);
    yield takeLatest(smartfarmSlice.actions.removeSmartfarmInitialize, initializeSaga);
    yield takeLatest(CHECK_SMARTFARM_NUMBER, checkSmartfarmNumberSaga);
    yield takeLatest(REGISTER_SMARTFARM, registerSmartfarmSaga);
    yield takeLatest(smartfarmSlice.actions.registerSmartfarmSuccess, checkSaga);
    yield takeLatest(GET_SMARTFARM, getSmartfarmSaga);
    yield takeLatest(MODIFY_SMARTFARM, modifySmartfarmSaga);
    yield takeLatest(smartfarmSlice.actions.modifySmartfarmSuccess, modifySmartfarmSuccessSaga);
    yield takeLatest(REMOVE_SMARTFARM, removeSmartfarmSaga);
    yield takeLatest(smartfarmSlice.actions.removeSmartfarmSuccess, removeSmartfarmSuccessSaga);
    yield takeLatest(CHANGE_REMOTE_CONTROL, changeRemoteControlSaga);
    yield takeLatest(smartfarmSlice.actions.changeRemoteControlSuccess, changeRemoteControlSuccessSaga);
}

export default smartfarmSlice.reducer;
export const {
    changeExist,
    changeSmartfarmNumber,
    changeRegisterSuccess,
    registerSmartfarmInitialize,
    modifySmartfarmInitialize,
    removeSmartfarmInitialize
} = smartfarmSlice.actions;