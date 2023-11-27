import { createAction, handleActions } from 'redux-actions';
import { select, put, takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/api/createRequestSaga';
import * as WebAPI from '../../lib/api/webApi';
import { check, CHECK_SUCCESS } from '../user/user';
import { initializeSaga, success, showSnackbar } from '../common';

const CHANGE_EXIST = 'plant/CHANGE_EXIST';
const CHANGE_NAME = 'plant/CHANGE_NAME';
const CHANGE_DAY = 'plant/CHANGE_DAY';
const REGISTER_PLANT_INITIALIZE = 'plant/REGISTER_PLANT_INITIALIZE';
const REGISTER_PLANT_SUCCESS_INITIALIZE = 'plant/REGISTER_PLANT_SUCCESS_INITIALIZE';
const MODIFY_PLANT_INITIALIZE = 'plant/MODIFY_PLANT_INITIALIZE';
const REMOVE_PLANT_INITIALIZE = 'plant/REMOVE_PLANT_INITIALIZE';
const [REGISTER_PLANT, REGISTER_PLANT_SUCCESS] = createRequestActionTypes('plant/REGISTER_PLANT');
const [GET_PLANT, GET_PLANT_SUCCESS] = createRequestActionTypes('plant/GET_PLANT');
const [MODIFY_PLANT, MODIFY_PLANT_SUCCESS] = createRequestActionTypes('plant/MODIFY_PLANT');
const [REMOVE_PLANT, REMOVE_PLANT_SUCCESS] = createRequestActionTypes('plant/REMOVE_PLANT');

export const changeExist = createAction(CHANGE_EXIST);
export const changeName = createAction(CHANGE_NAME, name => name);
export const changeDay = createAction(CHANGE_DAY, day => day);
export const registerPlantInitialize = createAction(REGISTER_PLANT_INITIALIZE);
export const registerPlantSuccessInitialize = createAction(REGISTER_PLANT_SUCCESS_INITIALIZE);
export const getPlant = createAction(GET_PLANT);
export const modifyPlantInitialize = createAction(MODIFY_PLANT_INITIALIZE);
export const removePlantInitialize = createAction(REMOVE_PLANT_INITIALIZE);
export const registerPlant = createAction(REGISTER_PLANT);
export const modifyPlant = createAction(MODIFY_PLANT);
export const removePlant = createAction(REMOVE_PLANT);

const registerPlantSaga = createRequestSaga(REGISTER_PLANT, WebAPI.registerPlant);
const getPlantSaga = createRequestSaga(GET_PLANT, WebAPI.getPlant);
const modifyPlantSaga = createRequestSaga(MODIFY_PLANT, WebAPI.modifyPlant);
const removePlantSaga = createRequestSaga(REMOVE_PLANT, WebAPI.removePlant);

function* checkSaga() {
    const token = yield select(state => state.user.token);

    yield put(check(token));
}

function* modifyPlantSuccessSaga() {
    yield put(success());
    yield put(showSnackbar('작물을 성공적으로 수정했습니다.'));
    checkSaga();
}

export function* plantSaga() {
    yield takeLatest(REGISTER_PLANT, registerPlantSaga);
    yield takeLatest(REGISTER_PLANT_SUCCESS, checkSaga);
    yield takeLatest(REGISTER_PLANT_INITIALIZE, initializeSaga);
    yield takeLatest(GET_PLANT, getPlantSaga);
    yield takeLatest(MODIFY_PLANT, modifyPlantSaga);
    yield takeLatest(MODIFY_PLANT_SUCCESS, modifyPlantSuccessSaga);
    yield takeLatest(REMOVE_PLANT, removePlantSaga);
    yield takeLatest(REGISTER_PLANT_SUCCESS, checkSaga);
}

const initialState = {
    exist: null,

    name: '',
    day: 0,
    ndvi: 0,

    registerPlantSuccess: null,
    modifyPlantSuccess: null,
    removePlantSuccess: null
};

const plant = handleActions(
    {
        [CHANGE_EXIST]: (state) => ({
            ...state,
            exist: !state.exist
        }),
        [CHANGE_NAME]: (state, { payload: name }) => ({
            ...state,
            name: name
        }),
        [CHANGE_DAY]: (state, { payload: day }) => ({
            ...state,
            day: day
        }),
        [REGISTER_PLANT_INITIALIZE]: (state) => ({
            ...state,
            name: '',
            day: 0,
            ndvi: 0,
            registerPlantSuccess: null
        }),
        [REGISTER_PLANT_SUCCESS_INITIALIZE]: (state) => ({
            ...state,
            registerPlantSuccess: null
        }),
        [REGISTER_PLANT_SUCCESS]: (state) => ({
            ...state,
            registerPlantSuccess: true
        }),
        [GET_PLANT_SUCCESS]: (state, { payload: {
            name,
            day
        }}) => ({
            ...state,
            name: name,
            day: day
        }),
        [MODIFY_PLANT_INITIALIZE]: (state) => ({
            ...state,
            modifyPlantSuccess: null
        }),
        [MODIFY_PLANT_SUCCESS]: (state) => ({
            ...state,
            modifyPlantSuccess: true
        }),
        [REMOVE_PLANT_INITIALIZE]: (state) => ({
            ...state,
            removePlantSuccess: null
        }),
        [REMOVE_PLANT_SUCCESS]: (state) => ({
            ...state,
            exist: false,
            name: '',
            day: 0,
            ndvi: 0,
            removePlantSuccess: true
        }),
        [CHECK_SUCCESS]: (state, { payload: {
            crop_check,
            crop_name,
            crop_day,
            ndvi
        }}) => ({
            ...state,
            exist: crop_check,
            name: crop_check ? crop_name : '',
            day: crop_check ? crop_day : 0,
            ndvi: crop_check ? ndvi : 0
        })
    },
    initialState
);

export default plant;