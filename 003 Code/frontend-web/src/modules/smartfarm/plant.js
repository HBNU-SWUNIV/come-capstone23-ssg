// 작물 생장 상태와 관련된 상태 관리 추가하기

import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/api/createRequestSaga';
import * as WebAPI from '../../lib/api/webApi';
import { initializeSaga } from '../common';

const CHANGE_EXIST = 'plant/CHANGE_EXIST';
const CHANGE_NAME = 'plant/CHANGE_NAME';
const CHANGE_DAY = 'plant/CHANGE_DAY';
const REGISTER_PLANT_INITIALIZE = 'plant/REGISTER_PLANT_INITIALIZE';
const MODIFY_PLANT_INITIALIZE = 'plant/MODIFY_PLANT_INITIALIZE';
const REMOVE_PLANT_INITIALIZE = 'plant/REMOVE_PLANT_INITIALIZE';
const [REGISTER_PLANT, REGISTER_PLANT_SUCCESS] = createRequestActionTypes('plant/REGISTER_PLANT');
const [MODIFY_PLANT, MODIFY_PLANT_SUCCESS] = createRequestActionTypes('plant/MODIFY_PLANT');
const [REMOVE_PLANT, REMOVE_PLANT_SUCCESS] = createRequestActionTypes('plant/REMOVE_PLANT');

export const changeExist = createAction(CHANGE_EXIST);
export const changeName = createAction(CHANGE_NAME, name => name);
export const changeDay = createAction(CHANGE_DAY, day => day);
export const registerPlantInitialize = createAction(REGISTER_PLANT_INITIALIZE);
export const modifyPlantInitialize = createAction(MODIFY_PLANT_INITIALIZE);
export const removePlantInitialize = createAction(REMOVE_PLANT_INITIALIZE);
export const registerPlant = createAction(REGISTER_PLANT);
export const modifyPlant = createAction(MODIFY_PLANT);
export const removePlant = createAction(REMOVE_PLANT);

const registerPlantSaga = createRequestSaga(REGISTER_PLANT, WebAPI.registerPlant);
const modifyPlantSaga = createRequestSaga(MODIFY_PLANT, WebAPI.modifyPlant);
const removePlantSaga = createRequestSaga(REMOVE_PLANT, WebAPI.removePlant);

export function* plantSaga() {
    yield takeLatest(REGISTER_PLANT, registerPlantSaga);
    yield takeLatest(REGISTER_PLANT_INITIALIZE, initializeSaga);
    yield takeLatest(MODIFY_PLANT, modifyPlantSaga);
    yield takeLatest(REMOVE_PLANT, removePlantSaga);
}

const initialState = {
    exist: null,

    name: '',
    day: 0,

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
            registerPlantSuccess: null
        }),
        [REGISTER_PLANT_SUCCESS]: (state) => ({
            ...state,
            registerPlantSuccess: true
        }),
        [MODIFY_PLANT_INITIALIZE]: (state) => ({
            ...state,
            name: '',
            day: 0,
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
            removePlantSuccess: true
        })
    },
    initialState
);

export default plant;