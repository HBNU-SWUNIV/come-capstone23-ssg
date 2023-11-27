import { createAction, handleActions } from 'redux-actions';
import { select, put, takeLatest } from 'redux-saga/effects';
import createControlRequestSaga, { createControlRequesActionTypes } from '../../lib/api/createControlRequestSaga';
import createRequestSaga, { createRequestActionTypes } from '../../lib/api/createRequestSaga';
import { changeRemoteControl as changeLedRemoteControl } from './ledControl';
import { changeRemoteControl as changeWateringSystemRemoteControl } from './wateringSystemControl';
import { changeRemoteControl as changeFanRemoteControl } from './fanControl';
import { changeRemoteControl as changeCenterDoorRemoteControl } from './centerDoorControl';
import { check, CHECK_SUCCESS } from '../user/user';
import { removePlant } from './plant';
import * as WebAPI from '../../lib/api/webApi';
import { initializeSaga, success, showSnackbar } from '../common';

const CHANGE_EXIST = 'smartfarm/CHANGE_EXIST';
const CHANGE_SMARTFARM_NUMBER = 'smartfarm/CHANGE_SMARTFARM_NUMBER';
const [CHANGE_REMOTE_CONTROL, CHANGE_REMOTE_CONTROL_SUCCESS] = createControlRequesActionTypes('smartfarm/CHANGE_REMOTE_CONTROL');
const REGISTER_SMARTFARM_INITIALIZE = 'smartfarm/REGISTER_SMARTFARM_INITIALIZE';
const REGISTER_SMARTFARM_SUCCESS_INITIALIZE = 'smartfarm/REGISTER_SMARTFARM_SUCCESS_INITIALIZE';
const [GET_SMARTFARM, GET_SMARTFARM_SUCCESS] = createRequestActionTypes('smartfarm/GET_SMARTFARM');
const MODIFY_SMARTFARM_INITIALIZE = 'smartfarm/MODIFY_SMARTFARM_INITIALIZE';
const REMOVE_SMARTFARM_INITIALIZE = 'smartfarm/REMOVE_SMARTFARM_INITIALIZE';
const [CHECK_SMARTFARM_NUMBER, CHECK_SMARTFARM_NUMBER_SUCCESS] = createRequestActionTypes('smartfarm/CHECK_SMARTFARM_NUMBER');
const [REGISTER_SMARTFARM, REGISTER_SMARTFARM_SUCCESS] = createRequestActionTypes('smartfarm/REGISTER_SMARTFARM');
const [MODIFY_SMARTFARM, MODIFY_SMARTFARM_SUCCESS] = createRequestActionTypes('smartfarm/MODIFY_SMARTFARM');
const [REMOVE_SMARTFARM, REMOVE_SMARTFARM_SUCCESS] = createRequestActionTypes('smartfarm/REMOVE_SMARTFARM');

export const changeExist = createAction(CHANGE_EXIST);
export const changeSmartfarmNumber = createAction(CHANGE_SMARTFARM_NUMBER, smartfarmNumber => smartfarmNumber);
export const changeRemoteControl = createAction(CHANGE_REMOTE_CONTROL);
export const registerSmartfarmInitialize = createAction(REGISTER_SMARTFARM_INITIALIZE);
export const registerSmartfarmSuccessInitialize = createAction(REGISTER_SMARTFARM_SUCCESS_INITIALIZE);
export const getSmartfarm = createAction(GET_SMARTFARM);
export const modifySmartfarmInitialize = createAction(MODIFY_SMARTFARM_INITIALIZE);
export const removeSmartfarmInitialize = createAction(REMOVE_SMARTFARM_INITIALIZE);
export const checkSmartfarmNumber = createAction(CHECK_SMARTFARM_NUMBER);
export const registerSmartfarm = createAction(REGISTER_SMARTFARM);
export const modifySmartfarm = createAction(MODIFY_SMARTFARM);
export const removeSmartfarm = createAction(REMOVE_SMARTFARM);

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

function* modifySmartfarmSuccessSaga() {
    yield put(success());
    yield put(showSnackbar('스마트팜을 성공적으로 수정했습니다.'));
    checkSaga();
}

function* removeSmartfarmSuccessSaga() {
    yield put(removePlant());
    checkSaga();
}

export function* smartfarmSaga() {
    yield takeLatest(REGISTER_SMARTFARM_INITIALIZE, initializeSaga);
    yield takeLatest(MODIFY_SMARTFARM_INITIALIZE, initializeSaga);
    yield takeLatest(REMOVE_SMARTFARM_INITIALIZE, initializeSaga);
    yield takeLatest(CHECK_SMARTFARM_NUMBER, checkSmartfarmNumberSaga);
    yield takeLatest(REGISTER_SMARTFARM, registerSmartfarmSaga);
    yield takeLatest(REGISTER_SMARTFARM_SUCCESS, checkSaga);
    yield takeLatest(GET_SMARTFARM, getSmartfarmSaga);
    yield takeLatest(MODIFY_SMARTFARM, modifySmartfarmSaga);
    yield takeLatest(MODIFY_SMARTFARM_SUCCESS, modifySmartfarmSuccessSaga);
    yield takeLatest(REMOVE_SMARTFARM, removeSmartfarmSaga);
    yield takeLatest(REMOVE_SMARTFARM_SUCCESS, removeSmartfarmSuccessSaga);
    yield takeLatest(CHANGE_REMOTE_CONTROL, changeRemoteControlSaga);
    yield takeLatest(CHANGE_REMOTE_CONTROL_SUCCESS, changeRemoteControlSuccessSaga);
}

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

const smartfarm = handleActions(
    {
        [CHANGE_EXIST]: (state) => ({
            ...state,
            exist: !state.exist
        }),
        [CHANGE_SMARTFARM_NUMBER]: (state, { payload: smartfarmNumber }) => ({
            ...state,
            smartfarmNumber: smartfarmNumber
        }),
        [CHANGE_REMOTE_CONTROL_SUCCESS]: (state, { payload: remoteControl }) => ({
            ...state,
            remoteControl: remoteControl
        }),
        [REGISTER_SMARTFARM_INITIALIZE]: (state) => ({
            ...state,
            smartfarmNumber: '',
            checkSmartfarmNumberSuccess: null,
            registerSmartfarmSuccess: null
        }),
        [REGISTER_SMARTFARM_SUCCESS_INITIALIZE]: (state) => ({
            ...state,
            checkSmartfarmNumberSuccess: null,
            registerSmartfarmSuccess: null
        }),
        [CHECK_SMARTFARM_NUMBER_SUCCESS]: (state) => ({
            ...state,
            checkSmartfarmNumberSuccess: true
        }),
        [REGISTER_SMARTFARM_SUCCESS]: (state) => ({
            ...state,
            registerSmartfarmSuccess: true
        }),
        [GET_SMARTFARM_SUCCESS]: (state, { payload: {smartfarm} }) => ({
            ...state,
            smartfarmNumber: smartfarm
        }),
        [MODIFY_SMARTFARM_INITIALIZE]: (state) => ({
            ...state,
            modifySmartfarmSuccess: null
        }),
        [MODIFY_SMARTFARM_SUCCESS]: (state) => ({
            ...state,
            modifySmartfarmSuccess: true
        }),
        [REMOVE_SMARTFARM_INITIALIZE]: (state) => ({
            ...state,
            smartfarmNumber: null,
            removeSmartfarmSuccess: null
        }),
        [REMOVE_SMARTFARM_SUCCESS]: (state) => ({
            ...state,
            exist: false,
            smartfarmNumber: '',
            remoteControl: false,
            temperature: 0,
            humidity: 0,
            waterTemperature: 0,
            waterLevel: 0,
            removeSmartfarmSuccess: true
        }),
        [CHECK_SUCCESS]: (state, { payload: {
            smartfarm_check,
            smartfarm,
            remotepower,
            temperature,
            humidity,
            watertemperature,
            waterlevelvoltage
        }}) => ({
            ...state,
            exist: smartfarm_check,
            smartfarmNumber: smartfarm_check ? smartfarm : '',
            remoteControl: smartfarm_check ? remotepower : false,
            temperature: smartfarm_check ? temperature : 0,
            humidity: smartfarm_check ? humidity : 0,
            waterTemperature: smartfarm_check ? watertemperature : 0,
            waterLevel: smartfarm_check ? waterlevelvoltage : 0
        })
    },
    initialState
);

export default smartfarm;