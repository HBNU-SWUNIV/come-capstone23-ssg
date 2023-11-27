import { createAction, createSlice } from "@reduxjs/toolkit";
import { takeLatest } from "redux-saga/effects";
import createControlRequestSaga from "../../assets/api/createControlRequestSaga";
import * as WebAPI from '../../assets/api/webApi';
import { checkSuccess } from "../user/user";

const CHANGE_WORK = 'ledControl/changeWork';
const CHANGE_AUTOWORK = 'ledControl/changeAutoWork';
const CHANGE_AUTOWORK_START_DAYNIGHT = 'ledControl/changeAutoWorkStartDayNight';
const CHANGE_AUTOWORK_START_HOUR = 'ledControl/changeAutoWorkStartHour';
const CHANGE_AUTOWORK_START_MINUTE = 'ledControl/changeAutoWorkStartMinute';
const CHANGE_AUTOWORK_END_DAYNIGHT = 'ledControl/changeAutoWorkEndDayNight';
const CHANGE_AUTOWORK_END_HOUR = 'ledControl/changeAutoWorkEndHour';
const CHANGE_AUTOWORK_END_MINUTE = 'ledControl/changeAutoWorkEndMinute';

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

    workButtonText: '켜기'
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

const ledControlSlice = createSlice({
    name: 'ledControl',
    initialState,
    reducers: {
        changeWorkSuccess(state) {
            state.work = !state.work
            state.status = state.work ? 'LED가 켜져 있어요' : 'LED가 꺼져 있어요'
            state.workButtonText = state.work ? '끄기' : '켜기'
        },
        changeAutoWorkSuccess(state) {
            state.work = false
            state.autoWork = !state.autoWork
            state.status = state.autoWork ? `LED가 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 켜지고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 꺼져요` : 'LED가 꺼져 있어요' 
            state.workButtonText = '켜기'
        },
        changeAutoWorkStartDayNightSuccess(state, action) {
            state.autoWorkStart.dayNight = action.payload
            state.status = `LED가 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 켜지고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 꺼져요`
        },
        changeAutoWorkStartHourSuccess(state, action) {
            state.autoWorkStart.hour = action.payload
            state.status = `LED가 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 켜지고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 꺼져요`
        },
        changeAutoWorkStartMinuteSuccess(state, action) {
            state.autoWorkStart.minute = action.payload
            state.status = `LED가 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 켜지고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 꺼져요`
        },
        changeAutoWorkEndDayNightSuccess(state, action) {
            state.autoWorkEnd.dayNight = action.payload
            state.status = `LED가 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 켜지고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 꺼져요`
        },
        changeAutoWorkEndHourSuccess(state, action) {
            state.autoWorkEnd.hour = action.payload
            state.status = `LED가 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 켜지고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 꺼져요`
        },
        changeAutoWorkEndMinuteSuccess(state, action) {
            state.autoWorkEnd.minute = action.payload
            state.status = `LED가 자동으로 ${state.autoWorkStart.dayNight} ${state.autoWorkStart.hour}:${state.autoWorkStart.minute}에 켜지고, ${state.autoWorkEnd.dayNight} ${state.autoWorkEnd.hour}:${state.autoWorkEnd.minute}에 꺼져요`
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
            state.status = action.payload ? 'LED가 꺼져 있어요' : '원격 제어 모드가 아니에요'
            state.workButtonText = '켜기'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkSuccess, (state, action) => {
                state.work = action.payload.remotepower ? action.payload.ledtoggle : false
                state.autoWork = action.payload.remotepower ? action.payload.ledautotogle : false
                state.autoWorkStart.dayNight = action.payload.remotepower ? dayNightIntToString(action.payload.ledstarttimevalue) : 'AM'
                state.autoWorkStart.hour = action.payload.remotepower ? hourIntToString(action.payload.ledstarttimevalue) : '00'
                state.autoWorkStart.minute = action.payload.remotepower ? minuteIntToString(action.payload.ledstartminutevalue) : '00'
                state.autoWorkEnd.dayNight = action.payload.remotepower ? dayNightIntToString(action.payload.ledendtimevalue) : 'AM'
                state.autoWorkEnd.hour = action.payload.remotepower ? hourIntToString(action.payload.ledendtimevalue) : '00'
                state.autoWorkEnd.minute = action.payload.remotepower ? minuteIntToString(action.payload.ledendminutevalue) : '00'
                state.status = action.payload.remotepower
                ? (action.payload.ledtoggle
                    ? 'LED가 켜져 있어요'
                    : (action.payload.ledautotogle
                        ? `LED가 자동으로 ${dayNightIntToString(action.payload.ledstarttimevalue)} ${hourIntToString(action.payload.ledstarttimevalue)}:${minuteIntToString(action.payload.ledstartminutevalue)}에 켜지고, ${dayNightIntToString(action.payload.ledendtimevalue)} ${hourIntToString(action.payload.ledendtimevalue)}:${minuteIntToString(action.payload.ledendminutevalue)}에 꺼져요`
                        : 'LED가 꺼져 있어요'
                    )
                ) : '원격 제어 모드가 아니에요'
                state.workButtonText = action.payload.ledtoggle ? '끄기' : '켜기'
            });
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

export function* ledControlSaga() {
    yield takeLatest(CHANGE_WORK, changeWorkSaga);
    yield takeLatest(CHANGE_AUTOWORK, changeAutoWorkSaga);
    yield takeLatest(CHANGE_AUTOWORK_START_DAYNIGHT, changeAutoWorkStartDayNightSaga);
    yield takeLatest(CHANGE_AUTOWORK_START_HOUR, changeAutoWorkStartHourSaga);
    yield takeLatest(CHANGE_AUTOWORK_START_MINUTE, changeAutoWorkStartMinuteSaga);
    yield takeLatest(CHANGE_AUTOWORK_END_DAYNIGHT, changeAutoWorkEndDayNightSaga);
    yield takeLatest(CHANGE_AUTOWORK_END_HOUR, changeAutoWorkEndHourSaga);
    yield takeLatest(CHANGE_AUTOWORK_END_MINUTE, changeAutoWorkEndMinuteSaga);
}

export default ledControlSlice.reducer;
export const {changeRemoteControl} = ledControlSlice.actions;