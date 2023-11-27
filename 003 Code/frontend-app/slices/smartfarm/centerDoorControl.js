import { createAction, createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import createControlRequestSaga from "../../assets/api/createControlRequestSaga";
import * as WebAPI from '../../assets/api/webApi';
import { checkSuccess } from "../user/user";

const CHANGE_WORK = 'centerDoorControl/changeWork';
const CHANGE_AUTOWORK = 'centerDoorControl/changeAutoWork';
const CHANGE_AUTOWORK_START_DAYNIGHT = 'centerDoorControl/changeAutoWorkStartDayNight';
const CHANGE_AUTOWORK_START_HOUR = 'centerDoorControl/changeAutoWorkStartHour';
const CHANGE_AUTOWORK_START_MINUTE = 'centerDoorControl/changeAutoWorkStartMinute';
const CHANGE_AUTOWORK_END_DAYNIGHT = 'centerDoorControl/changeAutoWorkEndDayNight';
const CHANGE_AUTOWORK_END_HOUR = 'centerDoorControl/changeAutoWorkEndHour';
const CHANGE_AUTOWORK_END_MINUTE = 'centerDoorControl/changeAutoWorkEndMinute';

export const changeWork = createAction(CHANGE_WORK);
export const changeAutoWork = createAction(CHANGE_AUTOWORK);
export const changeAutoWorkStartDayNight = createAction(CHANGE_AUTOWORK_START_DAYNIGHT, startDayNight => startDayNight);
export const changeAutoWorkStartHour = createAction(CHANGE_AUTOWORK_START_HOUR, startHour => startHour);
export const changeAutoWorkStartMinute = createAction(CHANGE_AUTOWORK_START_MINUTE, startMinute => startMinute);
export const changeAutoWorkEndDayNight = createAction(CHANGE_AUTOWORK_END_DAYNIGHT, endDayNight => endDayNight);
export const changeAutoWorkEndHour = createAction(CHANGE_AUTOWORK_END_HOUR, endHour => endHour);
export const changeAutoWorkEndMinute = createAction(CHANGE_AUTOWORK_END_MINUTE, endMinute => endMinute);

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

    workButtonText: '열기'
};

const centerDoorControlSlice = createSlice({
    name: 'centerDoorControl',
    initialState,
    reducers: {
        changeWorkSuccess(state) {
            state.work = !state.work
            state.status = state.work ? '중앙문이 열려 있어요' : '중앙문이 열려 있지 않아요',
            state.workButtonText = state.work ? '닫기' : '열기'
        },
        changeAutoWorkSuccess(state) {
            state.work = false
            state.autoWork = !state.autoWork
            state.status = state.autoWork ? `중앙문이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 열고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 닫아요` : '중앙문이 열려 있지 않아요' 
            state.workButtonText = '열기'
        },
        changeAutoWorkStartDayNightSuccess(state, action) {
            state.autoWorkStart.dayNight = action.payload
            state.status = `중앙문이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 열고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 닫아요`
        },
        changeAutoWorkStartHourSuccess(state, action) {
            state.autoWorkStart.hour = action.payload
            state.status = `중앙문이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 열고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 닫아요`
        },
        changeAutoWorkStartMinuteSuccess(state, action) {
            state.autoWorkStart.minute = action.payload
            state.status = `중앙문이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 열고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 닫아요`
        },
        changeAutoWorkEndDayNightSuccess(state, action) {
            state.autoWorkEnd.dayNight = action.payload
            state.status = `중앙문이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 열고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 닫아요`
        },
        changeAutoWorkEndHourSuccess(state, action) {
            state.autoWorkEnd.hour = action.payload
            state.status = `중앙문이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 열고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 닫아요`
        },
        changeAutoWorkEndMinuteSuccess(state, action) {
            state.autoWorkEnd.minute = action.payload
            state.status = `중앙문이 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 열고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 닫아요`
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
            state.status = action.payload ? '중앙문이 열려 있지 않아요' : '원격 제어 모드가 아니에요'
            state.workButtonText = '열기'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkSuccess, (state, action) => {
                state.work = action.payload.remotepower ? action.payload.doortoggle : false
                state.autoWork = action.payload.remotepower ? action.payload.doorautotogle : false
                state.autoWorkStart.dayNight = action.payload.remotepower ? dayNightIntToString(action.payload.doorstarttimevalue) : 'AM'
                state.autoWorkStart.hour = action.payload.remotepower ? hourIntToString(action.payload.doorstarttimevalue) : '00'
                state.autoWorkStart.minute = action.payload.remotepower ? minuteIntToString(action.payload.doorstartminutevalue) : '00'
                state.autoWorkEnd.dayNight = action.payload.remotepower ? dayNightIntToString(action.payload.doorendtimevalue) : 'AM'
                state.autoWorkEnd.hour = action.payload.remotepower ? hourIntToString(action.payload.doorendtimevalue) : '00'
                state.autoWorkEnd.minute = action.payload.remotepower ? minuteIntToString(action.payload.doorendminutevalue) : '00'
                state.status = action.payload.remotepower
                ? (action.payload.doortoggle
                    ? '중앙문이 열려 있어요'
                    : (action.payload.doorautotogle
                        ? `중앙이 자동으로 ${dayNightIntToString(action.payload.doorstarttimevalue)} ${hourIntToString(action.payload.doorstarttimevalue)}:${minuteIntToString(action.payload.doorstartminutevalue)}에 열고, ${dayNightIntToString(action.payload.doorendtimevalue)} ${hourIntToString(action.payload.doorendtimevalue)}:${minuteIntToString(action.payload.doorendminutevalue)}에 닫아요`
                        : '중앙문이 열려 있지 않아요'
                    )
                ) : '원격 제어 모드가 아니에요'
                state.workButtonText = action.payload.doortoggle ? '닫기' : '열기'
            })
    }
});

const changeWorkSaga = createControlRequestSaga(CHANGE_WORK, WebAPI.controlCenterDoor, 'work');
const changeAutoWorkSaga = createControlRequestSaga(CHANGE_AUTOWORK, WebAPI.controlCenterDoor, 'autoWork');
const changeAutoWorkStartDayNightSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_DAYNIGHT, WebAPI.controlCenterDoor, ['autoWorkStart', 'dayNight']);
const changeAutoWorkStartHourSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_HOUR, WebAPI.controlCenterDoor, ['autoWorkStart', 'hour']);
const changeAutoWorkStartMinuteSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_MINUTE, WebAPI.controlCenterDoor, ['autoWorkStart', 'minute']);
const changeAutoWorkEndDayNightSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_DAYNIGHT, WebAPI.controlCenterDoor, ['autoWorkEnd', 'dayNight']);
const changeAutoWorkEndHourSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_HOUR, WebAPI.controlCenterDoor, ['autoWorkEnd', 'hour']);
const changeAutoWorkEndMinuteSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_MINUTE, WebAPI.controlCenterDoor, ['autoWorkEnd', 'minute']);

export function* centerDoorControlSaga() {
    yield takeLatest(CHANGE_WORK, changeWorkSaga);
    yield takeLatest(CHANGE_AUTOWORK, changeAutoWorkSaga);
    yield takeLatest(CHANGE_AUTOWORK_START_DAYNIGHT, changeAutoWorkStartDayNightSaga);
    yield takeLatest(CHANGE_AUTOWORK_START_HOUR, changeAutoWorkStartHourSaga);
    yield takeLatest(CHANGE_AUTOWORK_START_MINUTE, changeAutoWorkStartMinuteSaga);
    yield takeLatest(CHANGE_AUTOWORK_END_DAYNIGHT, changeAutoWorkEndDayNightSaga);
    yield takeLatest(CHANGE_AUTOWORK_END_HOUR, changeAutoWorkEndHourSaga);
    yield takeLatest(CHANGE_AUTOWORK_END_MINUTE, changeAutoWorkEndMinuteSaga);
}

export default centerDoorControlSlice.reducer;
export const {changeRemoteControl} = centerDoorControlSlice.actions;