import { createSlice } from "@reduxjs/toolkit";
import { delay, put, takeLatest, select } from 'redux-saga/effects';

const initialState = {
    showPassword: false,
    showSnackbar: false,
    
    errorMessage: null
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        showSnackbar(state, action) {
            state.showSnackbar = true
            state.errorMessage = action.payload
        },
        unshowSnackbar(state) {
            state.showSnackbar = false
        },
        clearErrorMessage(state) {
            state.errorMessage = null
        }
    }
});

export function* initializeSaga() {
    const showSnackbar = yield select(state => state.common.showSnackbar);

    if (showSnackbar) {
        yield put(unshowSnackbar());
    }
}

function* unshowSnackbarSaga() {
    yield delay(100);
    yield put(commonSlice.actions.clearErrorMessage());
}

export function* commonSaga() {
    yield takeLatest(commonSlice.actions.unshowSnackbar, unshowSnackbarSaga);
}

export default commonSlice.reducer;
export const {
    showSnackbar,
    unshowSnackbar,
    clearErrorMessage
} = commonSlice.actions;