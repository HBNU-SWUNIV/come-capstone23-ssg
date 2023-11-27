import { createAction, createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import createControlRequestSaga from "../../assets/api/createControlRequestSaga";
import * as WebAPI from '../../assets/api/webApi';
import { checkSuccess } from "../user/user";

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
export const changeAutoWorkStartDayNight = createAction(CHANGE_AUTOWORK_START_DAYNIGHT);
export const changeAutoWorkStartHour = createAction(CHANGE_AUTOWORK_START_HOUR);
export const changeAutoWorkStartMinute = createAction(CHANGE_AUTOWORK_START_MINUTE);
export const changeAutoWorkEndDayNight = createAction(CHANGE_AUTOWORK_END_DAYNIGHT);
export const changeAutoWorkEndHour = createAction(CHANGE_AUTOWORK_END_HOUR);
export const changeAutoWorkEndMinute = createAction(CHANGE_AUTOWORK_END_MINUTE);

const initialState = {
    work: false,
    autoWork: false,
    autoWorkStart: {
        dayNight: 'AM',
        hour: '00',
        minute: '00'
    },
    autoWorkEnd: {
        dayNight: 'AM',
        hour: '00',
        minute: '00'
    },
    status: '원격 제어 모드가 아니에요',

    workButtonText: '작동하기'
};

function dayNightIntToString(hour) {
    if (hour < 12) {
        return 'AM';
    } else {
        return 'PM';
    }
}

function hourIntToString(hour) {
    if (hour < 10) {
        return `0${String(hour)}`;
    } else if (hour < 12) {
        return String(hour);
    } else if (hour < 22) {
        return `0${String(hour % 12)}`
    } else {
        return String(hour % 12);
    }
}

function minuteIntToString(minute) {
    if (minute < 10) {
        return `0${String(minute)}`;
    } else {
        return String(minute);
    }
}

const fanControlSlice = createSlice({
    name: 'fanControl',
    initialState,
    reducers: {
        changeWorkSuccess(state) {
            state.work = !state.work
            state.status = state.work ? '환기팬이 작동하고 있어요' : '환기팬이 작동하고 있지 않아요'
            state.workButtonText = state.work ? '중단하기' : '작동하기'
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
                hour: '00',
                minute: '00'
            }
            state.autoWorkEnd = {
                dayNight: 'AM',
                hour: '00',
                minute: '00'
            }
            state.status = action.payload ? '환기팬이 작동하고 있지 않아요' : '원격 제어 모드가 아니에요'
            state.workButtonText = '작동하기'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkSuccess, (state, action) => {
                state.work = action.payload.remotepower ? action.payload.fantoggle : false
                state.autoWork = action.payload.remotepower ? action.payload.fanautotogle : false
                state.autoWorkStart.dayNight = action.payload.remotepower ? dayNightIntToString(action.payload.fanstarttimevalue) : 'AM'
                state.autoWorkStart.hour = action.payload.remotepower ? hourIntToString(action.payload.fanstarttimevalue) : '00'
                state.autoWorkStart.minute = action.payload.remotepower ? minuteIntToString(action.payload.fanstartminutevalue) : '00'
                state.autoWorkEnd.dayNight = action.payload.remotepower ? dayNightIntToString(action.payload.fanendtimevalue) : 'AM'
                state.autoWorkEnd.hour = action.payload.remotepower ? hourIntToString(action.payload.fanendtimevalue) : '00'
                state.autoWorkEnd.minute = action.payload.remotepower ? minuteIntToString(action.payload.fanendminutevalue) : '00'
                state.status = action.payload.remotepower
                ? (action.payload.fantoggle
                    ? '환기팬이 작동하고 있어요'
                    : (action.payload.fanautotogle
                        ? `환기팬이 자동으로 ${dayNightIntToString(action.payload.fanstarttimevalue)} ${hourIntToString(action.payload.fanstarttimevalue)}:${minuteIntToString(action.payload.fanstartminutevalue)}에 작동하고, ${dayNightIntToString(action.payload.fanendtimevalue)} ${hourIntToString(action.payload.fanendtimevalue)}:${minuteIntToString(action.payload.fanendminutevalue)}에 중단해요`
                        : '환기팬이 작동하고 있지 않아요'
                    )
                ) : '원격 제어 모드가 아니에요'
                state.workButtonText = action.payload.fantoggle ? '중단하기' : '작동하기'
            })
    }
});

const changeWorkSaga = createControlRequestSaga(CHANGE_WORK, WebAPI.controlFan, 'work');
const changeAutoWorkSaga = createControlRequestSaga(CHANGE_AUTOWORK, WebAPI.controlFan, 'autoWork');
const changeAutoWorkStartDayNightSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_DAYNIGHT, WebAPI.controlFan, ['autoWorkStart', 'dayNight']);
const changeAutoWorkStartHourSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_HOUR, WebAPI.controlFan, ['autoWorkStart', 'hour']);
const changeAutoWorkStartMinuteSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_MINUTE, WebAPI.controlFan, ['autoWorkStart', 'minute']);
const changeAutoWorkEndDayNightSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_DAYNIGHT, WebAPI.controlFan, ['autoWorkEnd', 'dayNight']);
const changeAutoWorkEndHourSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_HOUR, WebAPI.controlFan, ['autoWorkEnd', 'hour']);
const changeAutoWorkEndMinuteSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_MINUTE, WebAPI.controlFan, ['autoWorkEnd', 'minute']);

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