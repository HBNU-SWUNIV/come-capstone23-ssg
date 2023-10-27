import { createAction, createSlice } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../../assets/api/createRequestSaga';
import * as WebAPI from '../../assets/api/webApi';
import { initializeSaga } from '../common';

const REGISTER_PLANT = 'plant/registerPlant';
const MODIFY_PLANT = 'plant/modifyPlant';
const REMOVE_PLANT = 'plant/removePlant';

export const registerPlant = createAction(REGISTER_PLANT);
export const modifyPlant = createAction(MODIFY_PLANT);
export const removePlant = createAction(REMOVE_PLANT);

const initialState = {
    exist: null,

    name: '',
    day: '0',

    registerPlantSuccess: null,
    modifyPlantSuccess: null,
    removePlantSuccess: null
};

const plantSlice = createSlice({
    name: 'plant',
    initialState,
    reducers: {
        changeExist(state) {
            state.exist = !state.exist
        },
        changeName(state, action) {
            state.name = action.payload
        },
        changeDay(state, action) {
            state.day = action.payload
        },
        registerPlantInitialize(state) {
            state.name = ''
            state.day = '0',
            state.registerPlantSuccess = null
        },
        registerPlantSuccess(state) {
            state.registerPlantSuccess = true
        },
        modifyPlantInitialize(state) {
            state.name = ''
            state.day = '0'
            state.modifyPlantSuccess = null
        },
        modifyPlantSuccess(state) {
            state.modifyPlantSuccess = true
        },
        removePlantInitialize(state) {
            state.removePlantSuccess = null
        },
        removePlantSuccess(state) {
            state.exist = false
            state.name = ''
            state.day = '0'
            state.removePlantSuccess = true
        }
    }
});

const registerPlantSaga = createRequestSaga(REGISTER_PLANT, WebAPI.registerPlant);
const modifyPlantSaga = createRequestSaga(MODIFY_PLANT, WebAPI.modifyPlant);
const removePlantSaga = createRequestSaga(REMOVE_PLANT, WebAPI.removePlant);

export function* plantSaga() {
    yield takeLatest(plantSlice.actions.registerPlantInitialize, initializeSaga);
    yield takeLatest(REGISTER_PLANT, registerPlantSaga);
    yield takeLatest(MODIFY_PLANT, modifyPlantSaga);
    yield takeLatest(REMOVE_PLANT, removePlantSaga);
}

export default plantSlice.reducer;
export const {
    changeExist,
    changeName,
    changeDay,
    registerPlantInitialize,
    modifyPlantInitialize,
    removePlantInitialize
} = plantSlice.actions;