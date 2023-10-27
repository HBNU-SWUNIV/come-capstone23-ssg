import { createAction, handleActions } from 'redux-actions';
import { select, put, delay, takeLatest } from 'redux-saga/effects';
import createControlRequestSaga, { createControlRequesActionTypes } from '../../lib/api/createControlRequestSaga';
import * as WebAPI from '../../lib/api/webApi';

const [CHANGE_WORK, CHANGE_WORK_SUCCESS] = createControlRequesActionTypes('wateringSystemControl/CHANGE_WORK');
const CHANGE_WORK_STOP = 'wateringSystemControl/CHANGE_WORK_STOP';
const [CHANGE_WORK_TIME, CHANGE_WORK_TIME_SUCCESS] = createControlRequesActionTypes('wateringSystemControl/CHANGE_WORK_TIME');
const [CHANGE_AUTOWORK, CHANGE_AUTOWORK_SUCCESS] = createControlRequesActionTypes('wateringSystemControl/CHANGE_AUTOWORK');
const [CHANGE_AUTOWORK_PERIOD, CHANGE_AUTOWORK_PERIOD_SUCCESS] = createControlRequesActionTypes('wateringSystemControl/CHANGE_AUTOWORK_PERIOD');
const CHANGE_REMOTE_CONTROL = 'wateringSystemControl/CHANGE_REMOTE_CONTROL';

export const changeWork = createAction(CHANGE_WORK);
export const changeWorkStop = createAction(CHANGE_WORK_STOP);
export const changeWorkTime = createAction(CHANGE_WORK_TIME, workTime => workTime);
export const changeAutoWork = createAction(CHANGE_AUTOWORK);
export const changeAutoWorkPeriod = createAction(CHANGE_AUTOWORK_PERIOD, autoWorkPeriod => autoWorkPeriod);
export const changeRemoteControl = createAction(CHANGE_REMOTE_CONTROL, remoteControl => remoteControl);

const changeWorkSaga = createControlRequestSaga(CHANGE_WORK, WebAPI.controlWateringSystem, 'work');
const changeWorkTimeSaga = createControlRequestSaga(CHANGE_WORK_TIME, WebAPI.controlWateringSystem, 'workTime');
const changeAutoWorkSaga = createControlRequestSaga(CHANGE_AUTOWORK, WebAPI.controlWateringSystem, 'autoWork');
const changeAutoWorkPeriodSaga = createControlRequestSaga(CHANGE_AUTOWORK_PERIOD, WebAPI.controlWateringSystem, 'autoWorkPeriod');

function* changeWorkSuccessSaga() {
    const workTime = yield select(state => state.wateringSystemControl.workTime);

    yield delay(workTime * 1000);

    yield put(changeWorkStop());
}

export function* wateringSystemControlSaga() {
    yield takeLatest(CHANGE_WORK, changeWorkSaga);
    yield takeLatest(CHANGE_WORK_TIME, changeWorkTimeSaga);
    yield takeLatest(CHANGE_AUTOWORK, changeAutoWorkSaga);
    yield takeLatest(CHANGE_AUTOWORK_PERIOD, changeAutoWorkPeriodSaga);    
    yield takeLatest(CHANGE_WORK_SUCCESS, changeWorkSuccessSaga);
}

const initialState = {
    work: false,
    workTime: 8,
    autoWork: false,
    autoWorkPeriod: 1,
    status: '원격 제어 모드가 아니에요',

    workButtonText: '물 주기',
    getError: 'null',
    postError: 'null'
};

const wateringSystemControl = handleActions(
    {
        [CHANGE_WORK_SUCCESS]: (state) => ({
            ...state,
            work: true,
            status: `관수 시스템이 ${state.workTime}초 동안 물을 뿌려요`,
            workButtonText: '중단하기'
        }),
        [CHANGE_WORK_STOP]: (state) => ({
            ...state,
            work: false,
            status: '관수 시스템이 작동하고 있지 않아요',
            workButtonText: '물 주기'
        }),
        [CHANGE_WORK_TIME_SUCCESS]: (state, { payload: workTime }) => ({
            ...state,
            workTime: workTime,
            status: `관수 시스템이 자동으로 ${state.autoWorkPeriod}시간 마다 ${workTime}초 동안 물을 뿌려요`
        }),
        [CHANGE_AUTOWORK_SUCCESS]: (state, { payload: autoWork}) => ({
            ...state,
            work: false,
            autoWork: autoWork,
            status: state.autoWork === true ? '관수 시스템이 작동하고 있지 않아요' : `관수 시스템이 자동으로 ${state.autoWorkPeriod}시간 마다 ${state.workTime}초 동안 물을 뿌려요`,
            workButtonText: '물 주기'
        }),
        [CHANGE_AUTOWORK_PERIOD_SUCCESS]: (state, { payload: autoWorkPeriod }) => ({
            ...state,
            autoWorkPeriod: autoWorkPeriod,
            status: `관수 시스템이 자동으로 ${autoWorkPeriod}시간 마다 ${state.workTime}초 동안 물을 뿌려요`
        }),
        [CHANGE_REMOTE_CONTROL]: (state, { payload: remoteControl }) => ({
            ...state,
            work: false,
            workTime: 8,
            autoWork: false,
            autoWorkPeriod: 1,
            status: remoteControl ? '관수 시스템이 작동하고 있지 않아요' : '원격 제어 모드가 아니에요',
            workButtonText: '물 주기'
        })
    },
    initialState
);

export default wateringSystemControl;