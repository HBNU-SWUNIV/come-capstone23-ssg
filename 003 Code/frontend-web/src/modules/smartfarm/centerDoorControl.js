import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';
import createControlRequestSaga, { createControlRequesActionTypes } from '../../lib/api/createControlRequestSaga';
import * as WebAPI from '../../lib/api/webApi';
import { CHECK_SUCCESS } from '../user/user';

const [CHANGE_WORK, CHANGE_WORK_SUCCESS] = createControlRequesActionTypes('centerDoorControl/CHANGE_WORK');
const [CHANGE_AUTOWORK, CHANGE_AUTOWORK_SUCCESS] = createControlRequesActionTypes('centerDoorControl/CHANGE_AUTOWORK');
const [CHANGE_AUTOWORK_START_TIME, CHANGE_AUTOWORK_START_TIME_SUCCESS] = createControlRequesActionTypes('centerDoorControl/CHANGE_AUTOWORK_START_TIME');
const [CHANGE_AUTOWORK_END_TIME, CHANGE_AUTOWORK_END_TIME_SUCCESS] = createControlRequesActionTypes('centerDoorControl/CHANGE_AUTOWORK_END_TIME');
const CHANGE_REMOTE_CONTROL = 'centerDoorControl/CHANGE_REMOTE_CONTROL';

export const changeWork = createAction(CHANGE_WORK);
export const changeAutoWork = createAction(CHANGE_AUTOWORK, autoWork => autoWork);
export const changeAutoWorkStartTime = createAction(CHANGE_AUTOWORK_START_TIME, startTime => startTime);
export const changeAutoWorkEndTime = createAction(CHANGE_AUTOWORK_END_TIME, endTime => endTime);
export const changeRemoteControl = createAction(CHANGE_REMOTE_CONTROL, remoteControl => remoteControl);

const changeWorkSaga = createControlRequestSaga(CHANGE_WORK, WebAPI.controlCenterDoor, 'work');
const changeAutoWorkSaga = createControlRequestSaga(CHANGE_AUTOWORK, WebAPI.controlCenterDoor, 'autoWork');
const changeLedAutoWorkStartTimeSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_TIME, WebAPI.controlCenterDoor, 'autoWorkStartTime');
const changeLedAutoWorkEndTimeSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_TIME, WebAPI.controlCenterDoor, 'autoWorkEndTime');

export function* centerDoorControlSaga() {
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

    workButtonText: '열기',
    getError: 'null',
    postError: 'null'
};

const centerDoorControl = handleActions(
    {
        [CHANGE_WORK_SUCCESS]: (state) => ({
            ...state,
            work: !state.work,
            status: state.work ? '중앙문이 열려 있지 않아요' : '중앙문이 열려 있어요',
            workButtonText: state.work ? '열기' : '닫기'
        }),
        [CHANGE_AUTOWORK_SUCCESS]: (state, { payload: autoWork }) => ({
            ...state,
            work: false,
            autoWork: autoWork,
            status: !state.autoWork ? `중앙문이 자동으로 ${state.autoWorkStartTime.format('A hh:mm')}에 열고, ${state.autoWorkEndTime.format('A hh:mm')}에 닫아요` : '중앙문이 열려 있지 않아요',
            workButtonText: '열기'
        }),
        [CHANGE_AUTOWORK_START_TIME_SUCCESS]: (state, { payload: startTime }) => ({
            ...state,
            autoWorkStartTime: startTime,
            status: `중앙문이 자동으로 ${startTime.format('A hh:mm')}에 열고, ${state.autoWorkEndTime.format('A hh:mm')}에 닫아요`
        }),
        [CHANGE_AUTOWORK_END_TIME_SUCCESS]: (state, { payload: endTime }) => ({
            ...state,
            autoWorkEndTime: endTime,
            status: `중앙문이 자동으로 ${state.autoWorkStartTime.format('A hh:mm')}에 열고, ${endTime.format('A hh:mm')}에 닫아요`
        }),
        [CHANGE_REMOTE_CONTROL]: (state, { payload: remoteControl }) => ({
            ...state,
            work: false,
            autoWork: false,
            status: remoteControl ? '중앙문이 열려 있지 않아요' : '원격 제어 모드가 아니에요',
            workButtonText: '열기'
        }),
        [CHECK_SUCCESS]: (state, { payload: {
            remotepower,
            doortoggle,
            doorautotoggle,
            doorstarttimevalue,
            doorstartminutevalue,
            doorendtimevalue,
            doorendminutevalue
        }}) => ({
            ...state,
            work: remotepower ? doortoggle : false,
            autoWork: remotepower ? doorautotoggle : false,
            autoWorkStartTime: remotepower ? dayjs(`${doorstarttimevalue}:${doorstartminutevalue}`, 'h:m') : dayjs(),
            autoWorkEndTime: remotepower ? dayjs(`${doorendtimevalue}:${doorendminutevalue}`, 'h:m') : dayjs(),
            status: remotepower
            ? (doortoggle
                ? '중앙문이 열려 있어요'
                : (doorautotoggle
                    ? `중앙문이 자동으로 ${dayjs(`${doorstarttimevalue}:${doorstartminutevalue}`, 'h:m').format('A hh:mm')}에 열고, ${dayjs(`${doorendtimevalue}:${doorendminutevalue}`, 'h:m').format('A hh:mm')}에 닫아요`
                    : '중앙문이 열려 있지 않아요'
                )
            ) : '원격 제어 모드가 아니에요',
            workButtonText: doortoggle ? '닫기' : '열기'
        })     
    },
    initialState
);

export default centerDoorControl;