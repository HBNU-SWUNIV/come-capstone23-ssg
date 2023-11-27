import { createAction, createSlice } from '@reduxjs/toolkit';
import { select, put, takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../../assets/api/createRequestSaga';
import * as WebAPI from '../../assets/api/webApi';
import { initializeSaga, success, showSnackbar } from '../common';
import { check, checkSuccess } from '../user/user';

const REGISTER_PLANT = 'plant/registerPlant';
const GET_PLANT = 'plant/getPlant';
const MODIFY_PLANT = 'plant/modifyPlant';
const REMOVE_PLANT = 'plant/removePlant';

export const registerPlant = createAction(REGISTER_PLANT);
export const getPlant = createAction(GET_PLANT);
export const modifyPlant = createAction(MODIFY_PLANT);
export const removePlant = createAction(REMOVE_PLANT);

const initialState = {
    exist: null,

    name: '',
    day: '0',
    ndvi: 0,

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
            state.day = '0'
            state.ndvi = 0
            state.registerPlantSuccess = null
        },
        registerPlantSuccess(state) {
            state.registerPlantSuccess = true
        },
        getPlantSuccess(state, action) {
            state.name = action.payload.name
            state.day = String(action.payload.day)
        },
        modifyPlantInitialize(state) {
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
            state.ndvi = 0
            state.removePlantSuccess = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkSuccess, (state, action) => {
                state.exist = action.payload.crop_check
                state.name = action.payload.crop_check ? action.payload.crop_name : ''
                state.day = action.payload.crop_check ? String(action.payload.crop_day) : '0'
                state.ndvi = action.payload.crop_check ? action.payload.ndvi : 0
            })
    }
});

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
    yield put(showSnackbar('개인 정보를 성공적으로 수정했습니다.'));
    checkSaga();
}

export function* plantSaga() {
    yield takeLatest(plantSlice.actions.registerPlantInitialize, initializeSaga);
    yield takeLatest(REGISTER_PLANT, registerPlantSaga);
    yield takeLatest(plantSlice.actions.registerPlantSuccess, checkSaga);
    yield takeLatest(GET_PLANT, getPlantSaga);
    yield takeLatest(MODIFY_PLANT, modifyPlantSaga);
    yield takeLatest(plantSlice.actions.modifyPlantSuccess, modifyPlantSuccessSaga);
    yield takeLatest(REMOVE_PLANT, removePlantSaga);
    yield takeLatest(plantSlice.actions.removePlantSuccess, checkSaga);
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