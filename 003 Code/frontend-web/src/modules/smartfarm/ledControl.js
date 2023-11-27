import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import dayjs from 'dayjs';
import createControlRequestSaga, { createControlRequesActionTypes } from '../../lib/api/createControlRequestSaga';
import * as WebAPI from '../../lib/api/webApi';
import { CHECK_SUCCESS } from '../user/user';

const [CHANGE_WORK, CHANGE_WORK_SUCCESS] = createControlRequesActionTypes('ledControl/CHANGE_WORK');
const [CHANGE_AUTOWORK, CHANGE_AUTOWORK_SUCCESS] = createControlRequesActionTypes('ledControl/CHANGE_AUTOWORK');
const [CHANGE_AUTOWORK_START_TIME, CHANGE_AUTOWORK_START_TIME_SUCCESS] = createControlRequesActionTypes('ledControl/CHANGE_AUTOWORK_START_TIME');
const [CHANGE_AUTOWORK_END_TIME, CHANGE_AUTOWORK_END_TIME_SUCCESS] = createControlRequesActionTypes('ledControl/CHANGE_AUTOWORK_END_TIME');
const CHANGE_REMOTE_CONTROL = 'ledControl/CHANGE_REMOTE_CONTROL';

export const changeWork = createAction(CHANGE_WORK);
export const changeAutoWork = createAction(CHANGE_AUTOWORK, autoWork => autoWork);
export const changeAutoWorkStartTime = createAction(CHANGE_AUTOWORK_START_TIME, startTime => startTime);
export const changeAutoWorkEndTime = createAction(CHANGE_AUTOWORK_END_TIME);
export const changeRemoteControl = createAction(CHANGE_REMOTE_CONTROL, remoteControl => remoteControl);

const changeWorkSaga = createControlRequestSaga(CHANGE_WORK, WebAPI.controlLed, 'work');
const changeAutoWorkSaga = createControlRequestSaga(CHANGE_AUTOWORK, WebAPI.controlLed, 'autoWork');
const changeLedAutoWorkStartTimeSaga = createControlRequestSaga(CHANGE_AUTOWORK_START_TIME, WebAPI.controlLed, 'autoWorkStartTime');
const changeLedAutoWorkEndTimeSaga = createControlRequestSaga(CHANGE_AUTOWORK_END_TIME, WebAPI.controlLed, 'autoWorkEndTime');

export function* ledControlSaga() {
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

    workButtonText: '켜기'
};

const ledControl = handleActions(
    {
        [CHANGE_WORK_SUCCESS]: (state) => ({
            ...state,
            work: !state.work,
            status: state.work === true ? 'LED가 꺼져 있어요' : 'LED가 켜져 있어요',
            workButtonText: state.work === true ? '켜기' : '끄기'
        }),
        [CHANGE_AUTOWORK_SUCCESS]: (state, { payload: autoWork }) => ({
            ...state,
            work: false,
            autoWork: autoWork,
            status: !state.autoWork ? `LED가 자동으로 ${state.autoWorkStartTime.format('A hh:mm')}에 켜지고, ${state.autoWorkEndTime.format('A hh:mm')}에 꺼져요` : 'LED가 꺼져 있지 않아요',
            workButtonText: '켜기'
        }),
        [CHANGE_AUTOWORK_START_TIME_SUCCESS]: (state, { payload: startTime }) => ({
            ...state,
            autoWorkStartTime: startTime,
            status: `LED가 자동으로 ${startTime.format('A hh:mm')}에 켜지고, ${state.autoWorkEndTime.format('A hh:mm')}에 꺼져요`
        }),
        [CHANGE_AUTOWORK_END_TIME_SUCCESS]: (state, { payload: endTime }) => ({
            ...state,
            autoWorkEndTime: endTime,
            status: `LED가 자동으로 ${state.autoWorkStartTime.format('A hh:mm')}에 켜지고, ${endTime.format('A hh:mm')}에 꺼져요`
        }),
        [CHANGE_REMOTE_CONTROL]: (state, { payload: remoteControl }) => ({
            ...state,
            work: false,
            autoWork: false,
            status: remoteControl ? 'LED가 꺼져 있어요' : '원격 제어 모드가 아니에요',
            workButtonText: '켜기'
        }),
        [CHECK_SUCCESS]: (state, { payload: {
            remotepower,
            ledtoggle,
            ledautotoggle,
            ledstarttimevalue,
            ledstartminutevalue,
            ledendtimevalue,
            ledendminutevalue
        }}) => ({
            ...state,
            work: remotepower ? ledtoggle : false,
            autoWork: remotepower ? ledautotoggle : false,
            autoWorkStartTime: remotepower ? dayjs(`${ledstarttimevalue}:${ledstartminutevalue}`, 'h:m') : dayjs(),
            autoWorkEndTime: remotepower ? dayjs(`${ledendtimevalue}:${ledendminutevalue}`, 'h:m') : dayjs(),
            status: remotepower
            ? (ledtoggle
                ? 'LED가 켜져 있어요'
                : (ledautotoggle
                    ? `LED가 자동으로 ${dayjs(`${ledstarttimevalue}:${ledstartminutevalue}`, 'h:m').format('A hh:mm')}에 켜지고, ${dayjs(`${ledendtimevalue}:${ledendminutevalue}`, 'h:m').format('A hh:mm')}에 꺼져요`
                    : 'LED가 꺼져 있어요'
                )
            ) : '원격 제어 모드가 아니에요',
            workButtonText: ledtoggle ? '끄기' : '켜기'
        })
    },
    initialState
);

export default ledControl;