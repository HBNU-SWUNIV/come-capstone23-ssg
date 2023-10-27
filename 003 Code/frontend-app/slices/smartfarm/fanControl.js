import { createAction, createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import createControlRequestSaga from "../../assets/api/createControlRequestSaga";
import * as WebAPI from '../../assets/api/webApi';

const CHANGE_WORK = 'fanControl/changeWork';
const CHANGE_AUTOWORK = 'fanControl/changeAutoWork';
const CHANGE_AUTOWORK_START_DAYNIGHT = 'fanControl/changeAutoWorkStartDayNight';
const CHANGE_AUTOWORK_START_HOUR = 'fanControl/changeAutoWorkStartHour';
const CHANGE_AUTOWORK_START_MINUTE = 'fanControl/changeAutoWorkStartMinute';
const CHANGE_AUTOWORK_END_DAYNIGHT = 'fanControl/changeAutoWorkEndDayNight';
const CHANGE_AUTOWORK_END_HOUR = 'fanControl/changeAutoWorkEndHour';
const CHANGE_AUTOWORK_END_MINUTE = 'fanControl/changeAutoWorkEndMinute';

export const changeWork = createAction(CHANGE_WORK);
export const changeAutoWork = createAction(CHANGE_AUTOWORK);
export const changeAutoWorkStartDayNight = createAction(CHANGE_AUTOWORK_START_DAYNIGHT, startDayNight => startDayNight);
export const changeAutoWorkStartHour = createAction(CHANGE_AUTOWORK_START_HOUR, startHour => startHour);
export const changeAutoWorkStartMinute = createAction(CHANGE_AUTOWORK_START_MINUTE, startMinute => startMinute);
export const changeAutoWorkEndDayNight = createAction(CHANGE_AUTOWORK_END_DAYNIGHT, endDayNight => endDayNight);
export const changeAutoWorkEndHour = createAction(CHANGE_AUTOWORK_END_HOUR, endHour => endHour);
export const changeAutoWorkEndMinute = createAction(CHANGE_AUTOWORK_END_MINUTE, endMinute => endMinute);

const initialState = {
    work: false,
    autoWork: false,
    autoWorkStart: {
        dayNight: 'AM',
        hour: '01',
        minute: '00'
    },
    autoWorkEnd: {
        dayNight: 'AM',
        hour: '01',
        minute: '00'
    },
    status: '원격 제어 모드가 아니에요',

    workButtonText: '작동하기'
};

const fanControlSlice = createSlice({
    name: 'fanControl',
    initialState,
    reducers: {
        changeWorkSuccess(state) {
            state.work = !state.work
            state.status = state.work ? '환기팬이 작동하고 있지 않아요' : '환기팬이 작동하고 있어요'
            state.workButtonText = state.work ? '작동하기' : '중단하기'
        },
        changeAutoWorkSuccess(state) {
            state.work = false
            state.autoWork = !state.autoWork
            state.status = state.autoWork ? `환기팬이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 작동하고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 중단해요` : '환기팬이 작동하고 있지 않아요' 
            state.workButtonText = '작동하기'
        },
        changeAutoWorkStartDayNightSuccess(state, action) {
            state.autoWorkStart.dayNight = action.payload
            state.status = `환기팬이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 작동하고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 중단해요`
        },
        changeAutoWorkStartHourSuccess(state, action) {
            state.autoWorkStart.hour = action.payload
            state.status = `환기팬이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 작동하고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 중단해요`
        },
        changeAutoWorkStartMinuteSuccess(state, action) {
            state.autoWorkStart.minute = action.payload
            state.status = `환기팬이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 작동하고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 중단해요`
        },
        changeAutoWorkEndDayNightSuccess(state, action) {
            state.autoWorkEnd.dayNight = action.payload
            state.status = `환기팬이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 작동하고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 중단해요`
        },
        changeAutoWorkEndHourSuccess(state, action) {
            state.autoWorkEnd.hour = action.payload
            state.status = `환기팬이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 작동하고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 중단해요`
        },
        changeAutoWorkEndMinuteSuccess(state, action) {
            state.autoWorkEnd.minute = action.payload
            state.status = `환기팬이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 작동하고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 중단해요`
        },
        changeRemoteControl(state, action) {
            state.work = false
            state.autoWork = false
            state.autoWorkStart = {
                dayNight: 'AM',
                hour: '01',
                minute: '00'
            }
            state.autoWorkEnd = {
                dayNight: 'AM',
                hour: '01',
                minute: '00'
            }
            state.status = action.payload ? '환기팬이 작동하고 있지 않아요' : '원격 제어 모드가 아니에요'
            state.workButtonText = '작동하기'
        }
    }
});

const changeWorkSaga = createControlRequestSaga(CHANGE_WORK, WebAPI.controlLed, 'work');
const changeAutoWorkSaga = createControlRequestSaga(CHANGE_AUTOWORK, WebAPI.controlLed, 'autoWork');
const changeAutoWorkStartDayNightSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_DAYNIGHT, WebAPI.controlLed, ['autoWorkStart', 'dayNight']);
const changeAutoWorkStartHourSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_HOUR, WebAPI.controlLed, ['autoWorkStart', 'hour']);
const changeAutoWorkStartMinuteSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_MINUTE, WebAPI.controlLed, ['autoWorkStart', 'minute']);
const changeAutoWorkEndDayNightSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_DAYNIGHT, WebAPI.controlLed, ['autoWorkEnd', 'dayNight']);
const changeAutoWorkEndHourSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_HOUR, WebAPI.controlLed, ['autoWorkEnd', 'hour']);
const changeAutoWorkEndMinuteSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_MINUTE, WebAPI.controlLed, ['autoWorkEnd', 'minute']);

export function* fanControlSaga() {
    yield takeLatest(CHANGE_WORK, changeWorkSaga);
    yield takeLatest(CHANGE_AUTOWORK, changeAutoWorkSaga);
    yield takeLatest(CHANGE_AUTOWORK_START_DAYNIGHT, changeAutoWorkStartDayNightSaga);
    yield takeLatest(CHANGE_AUTOWORK_START_HOUR, changeAutoWorkStartHourSaga);
    yield takeLatest(CHANGE_AUTOWORK_START_MINUTE, changeAutoWorkStartMinuteSaga);
    yield takeLatest(CHANGE_AUTOWORK_END_DAYNIGHT, changeAutoWorkEndDayNightSaga);
    yield takeLatest(CHANGE_AUTOWORK_END_HOUR, changeAutoWorkEndHourSaga);
    yield takeLatest(CHANGE_AUTOWORK_END_MINUTE, changeAutoWorkEndMinuteSaga);
}

export default fanControlSlice.reducer;
export const {changeRemoteControl} = fanControlSlice.actions;