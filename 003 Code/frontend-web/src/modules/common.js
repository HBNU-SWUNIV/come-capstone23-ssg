import { createAction, handleActions } from 'redux-actions';
import { select, delay, put, takeLatest } from 'redux-saga/effects';

const SHOW_SNACKBAR = 'common/SHOW_SNACKBAR';
const UNSHOW_SNACKBAR = 'common/UNSHOW_SNACKBAR';
const CLEAR_ERROR_MESSAGE = 'common/CLEAR_ERROR_MESSAGE';
const SUCCESS = 'common/SUCCESS';

export const showSnackbar = createAction(SHOW_SNACKBAR, errorMessage => errorMessage);
export const unshowSnackbar = createAction(UNSHOW_SNACKBAR);
export const clearErrorMessage = createAction(CLEAR_ERROR_MESSAGE);
export const success = createAction(SUCCESS);

const initialState = {
    showPassword: false,
    showSnackbar: false,
    
    errorMessage: null,

    success: false
};

export function* initializeSaga() {
    const showSnackbar = yield select(state => state.common.showSnackbar);

    if (showSnackbar) {
        yield put(unshowSnackbar());
    }
}

function* unshowSnackbarSaga() {
    yield delay(100);
    yield put(clearErrorMessage());
}

export function* commonSaga() {
    yield takeLatest(UNSHOW_SNACKBAR, unshowSnackbarSaga);
}

const common = handleActions(
    {
        [SHOW_SNACKBAR]: (state, { payload: errorMessage }) => ({
            ...state,
            showSnackbar: true,
            errorMessage: errorMessage
        }),
        [UNSHOW_SNACKBAR]: (state) => ({
            ...state,
            showSnackbar: false
        }),
        [CLEAR_ERROR_MESSAGE]: (state) => ({
            ...state,
            errorMessage: null,
            success: false
        }),
        [SUCCESS]: (state) => ({
            ...state,
            success: true
        })
    },
    initialState
);

export default common;