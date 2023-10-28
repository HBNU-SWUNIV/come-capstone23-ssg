import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';
import createControlRequestSaga, { createControlRequesActionTypes } from '../../lib/api/createControlRequestSaga';
import * as WebAPI from '../../lib/api/webApi';

const [CHANGE_WORK, CHANGE_WORK_SUCCESS] = createControlRequesActionTypes('fanControl/CHANGE_WORK');
const [CHANGE_AUTOWORK, CHANGE_AUTOWORK_SUCCESS] = createControlRequesActionTypes('fanControl/CHANGE_AUTOWORK');
const [CHANGE_AUTOWORK_START_TIME, CHANGE_AUTOWORK_START_TIME_SUCCESS] = createControlRequesActionTypes('fanControl/CHANGE_AUTOWORK_START_TIME');
const [CHANGE_AUTOWORK_END_TIME, CHANGE_AUTOWORK_END_TIME_SUCCESS] = createControlRequesActionTypes('fanControl/CHANGE_AUTOWORK_END_TIME');
const CHANGE_REMOTE_CONTROL = 'fanControl/CHANGE_REMOTE_CONTROL';

export const changeWork = createAction(CHANGE_WORK);
export const changeAutoWork = createAction(CHANGE_AUTOWORK, autoWork => autoWork);
export const changeAutoWorkStartTime = createAction(CHANGE_AUTOWORK_START_TIME, startTime => startTime);
export const changeAutoWorkEndTime = createAction(CHANGE_AUTOWORK_END_TIME, endTime => endTime);
export const changeRemoteControl = createAction(CHANGE_REMOTE_CONTROL, remoteControl => remoteControl);

const changeWorkSaga = createControlRequestSaga(CHANGE_WORK, WebAPI.controlLed, 'work');
const changeAutoWorkSaga = createControlRequestSaga(CHANGE_AUTOWORK, WebAPI.controlLed, 'autoWork');
const changeLedAutoWorkStartTimeSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_TIME, WebAPI.controlLed, 'autoWorkStartTime');
const changeLedAutoWorkEndTimeSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_TIME, WebAPI.controlLed, 'autoWorkEndTime');

export function* fanControlSaga() {
    yield takeLatest(CHANGE_WORK, changeWorkSaga);
    yield takeLatest(CHANGE_AUTOWORK, changeAutoWorkSaga);
    yield takeLatest(CHANGE_AUTOWORK_START_TIME, changeLedAutoWorkStartTimeSaga);
    yield takeLatest(CHANGE_AUTOWORK_END_TIME, changeLedAutoWorkEndTimeSaga);
}

const initialState = {
    work: false,
    autoWork: false,
    autoWorkStartTime: dayjs(),
    autoWorkEndTime: dayjs(),
    status: '원격 제어 모드가 아니에요',

    workButtonText: '작동하기',
    getError: 'null',
    postError: 'null'
};

const fanControl = handleActions(
    {
        [CHANGE_WORK_SUCCESS]: (state) => ({
            ...state,
            work: !state.work,
            status: state.work === true ? '환기팬이 작동하고 있지 않아요' : '환기팬이 작동하고 있어요',
            workButtonText: state.work === true ? '작동하기' : '중단하기'
        }),
        [CHANGE_AUTOWORK_SUCCESS]: (state, { payload: autoWork }) => ({
            ...state,
            work: false,
            autoWork: autoWork,
            status: state.autoWork === true ? '환기팬이 작동하고 있지 않아요' : `${state.autoWorkPeriod}${state.autoWorkPeriodUnit} 이후에 ${state.autoWorkTime}${state.autoWorkTimeUnit} 동안 작동해요`,
            workButtonText: '작동하기'
        }),
        [CHANGE_AUTOWORK_START_TIME_SUCCESS]: (state, { payload: startTime }) => ({
            ...state,
            autoWorkStartTime: startTime,
            status: `환기팬이 자동으로 ${startTime.format('A hh:mm')}에 작동하고, ${state.autoWorkEndTime.format('A hh:mm')}에 중단해요`
        }),
        [CHANGE_AUTOWORK_END_TIME_SUCCESS]: (state, { payload: endTime }) => ({
            ...state,
            autoWorkEndTime: endTime,
            status: `환기팬이 자동으로 ${state.autoWorkStartTime.format('A hh:mm')}에 작동하고, ${endTime.format('A hh:mm')}에 중단해요`
        }),
        [CHANGE_REMOTE_CONTROL]: (state, { payload: remoteControl }) => ({
            ...state,
            work: false,
            autoWork: false,
            status: remoteControl ? '환기팬이 작동하고 있지 않아요' : '원격 제어 모드가 아니에요',
            workButtonText: '작동하기'
        })    
    },
    initialState
);

export default fanControl;