import { createAction, createSlice } from "@reduxjs/toolkit";
import {
    select,
    put,
    delay,
    takeLatest
} from 'redux-saga/effects';
import createControlRequestSaga from "../../assets/api/createControlRequestSaga";
import * as WebAPI from '../../assets/api/webApi';

const CHANGE_WORK = 'wateringSystemControl/changeWork';
const CHANGE_WORK_TIME = 'wateringSystemControl/changeWorkTime';
const CHANGE_AUTOWORK = 'wateringSystemControl/changeAutoWork';
const CHANGE_AUTOWORK_PERIOD = 'wateringSystemControl/changeAutoWorkPeriod';

export const changeWork = createAction(CHANGE_WORK);
export const changeWorkTime = createAction(CHANGE_WORK_TIME, workTime => workTime);
export const changeAutoWork = createAction(CHANGE_AUTOWORK);
export const changeAutoWorkPeriod = createAction(CHANGE_AUTOWORK_PERIOD, autoWorkPeriod => autoWorkPeriod);

const initialState = {
    work: false,
    workTime: 8,
    autoWork: false,
    autoWorkPeriod: 1,
    status: '원격 제어 모드가 아니에요',

    workButtonText: '물 주기'
};

const wateringSystemControlSlice = createSlice({
    name: 'wateringSystemControl',
    initialState,
    reducers: {
        changeWorkSuccess(state) {
            state.work = true
            state.status = `관수 시스템이 ${state.workTime}초 동안 물을 뿌려요`
            state.workButtonText = '중단하기'
        },
        changeWorkStop(state) {
            state.work = false
            state.status = '관수 시스템이 작동하고 있지 않아요'
            state.workButtonText = '물 주기'
        },
        changeWorkTimeSuccess(state, action) {
            state.workTime = action.payload
            state.status = `관수 시스템이 자동으로 ${state.autoWorkPeriod} 시간 마다 ${state.workTime} 초 동안 물을 뿌려요`
        },
        changeAutoWorkSuccess(state) {
            state.work = false
            state.autoWork = !state.autoWork
            state.status = state.autoWork ? `관수 시스템이 자동으로 ${state.autoWorkPeriod} 시간 마다 ${state.workTime} 초 동안 물을 뿌려요` : '관수 시스템이 작동하고 있지 않아요'
            state.workButtonText = '물 주기'
        },
        changeAutoWorkPeriodSuccess(state, action) {
            state.autoWorkPeriod = action.payload
            state.status = `관수 시스템이 자동으로 ${state.autoWorkPeriod} 시간 마다 ${state.workTime} 초 동안 물을 뿌려요`
        },
        changeRemoteControl(state, action) {
            state.work = false
            state.workTime = 8
            state.autoWork = false
            state.autoWorkPeriod = 1
            state.status = action.payload ? '관수 시스템이 작동하고 있지 않아요' : '원격 제어 모드가 아니에요'
            state.workButtonText = '물 주기'
        }
    }
});

const changeWorkSaga = createControlRequestSaga(CHANGE_WORK, WebAPI.controlWateringSystem, 'work');
const changeWorkTimeSaga = createControlRequestSaga(CHANGE_WORK_TIME, WebAPI.controlWateringSystem, 'workTime');
const changeAutoWorkSaga = createControlRequestSaga(CHANGE_AUTOWORK, WebAPI.controlWateringSystem, 'autoWork');
const changeAutoWorkPeriodSaga = createControlRequestSaga(CHANGE_AUTOWORK_PERIOD, WebAPI.controlWateringSystem, 'autoWorkPeriod');

function* changeWorkSuccessSaga() {
    const workTime = yield select(state => state.wateringSystemControl.workTime);

    yield delay(workTime * 1000);

    yield put(wateringSystemControlSlice.actions.changeWorkStop());
}

export function* wateringSystemControlSaga() {
    yield takeLatest(CHANGE_WORK, changeWorkSaga);
    yield takeLatest(CHANGE_WORK_TIME, changeWorkTimeSaga);
    yield takeLatest(CHANGE_AUTOWORK, changeAutoWorkSaga);
    yield takeLatest(CHANGE_AUTOWORK_PERIOD, changeAutoWorkPeriodSaga);
    yield takeLatest(wateringSystemControlSlice.actions.changeWorkSuccess, changeWorkSuccessSaga);
}

export default wateringSystemControlSlice.reducer;
export const {changeRemoteControl} = wateringSystemControlSlice.actions;