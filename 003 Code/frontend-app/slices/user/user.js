import { createAction, createSlice } from '@reduxjs/toolkit';
import { select, put, takeLatest } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createRequestSaga from '../../assets/api/createRequestSaga';
import createRequestWithoutSnackbarSaga from '../../assets/api/createRequestWithoutSnackbarSaga';
import * as WebAPI from '../../assets/api/webApi';
import { initializeSaga, success, showSnackbar } from '../common';


const SIGNUP = 'user/signup';
const LOGIN = 'user/login';
export const CHECK = 'user/check';
const LOGOUT = 'user/logout';
const SEARCH_ID = 'user/searchId';
const SEARCH_PASSWORD = 'user/searchPassword';
const VERIFY = 'user/verify';
const GET_PERSONAL_INFORMATION = 'user/getPersonalInformation';
const MODIFY_PERSONAL_INFORMATION = 'user/modifyPersonalInformation';
const MODIFY_PASSWORD = 'user/modifyPassword';
const WITHDRAW = 'user/withdraw';

export const signup = createAction(SIGNUP);
export const login = createAction(LOGIN);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const searchId = createAction(SEARCH_ID);
export const searchPassword = createAction(SEARCH_PASSWORD);
export const verify = createAction(VERIFY);
export const getPersonalInformation = createAction(GET_PERSONAL_INFORMATION);
export const modifyPersonalInformation = createAction(MODIFY_PERSONAL_INFORMATION);
export const modifyPassword = createAction(MODIFY_PASSWORD);
export const withdraw = createAction(WITHDRAW);

const initialState = {
    token: null,
    id: '',
    password: '',
    passwordCheck: '',
    name: '',
    phoneNumber: '',

    signupSuccess: null,
    loginSuccess: null,
    logoutSuccess: null,
    searchIdSuccess: null,
    searchPasswordSuccess: null,
    verifySuccess: null,
    modifyPersonalInformationSuccess: null,
    modifyPasswordSuccess: null,
    withdrawSuccess: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeId(state, action) {
            state.id = action.payload
        },
        changePassword(state, action) {
            state.password = action.payload
        },
        changePasswordCheck(state, action) {
            state.passwordCheck = action.payload
        },
        changeName(state, action) {
            state.name = action.payload
        },
        changePhoneNumber(state, action) {
            state.phoneNumber = action.payload
        },
        logout(state) {
            state.token = null
            state.id = ''
            state.password = ''
            state.passwordCheck = ''
            state.name = ''
            state.phoneNumber = ''
        },
        signupInitialize(state) {
            state.id = ''
            state.password = ''
            state.passwordCheck = ''
            state.name = ''
            state.signupSuccess = null
        },
        signupSuccess(state) {
            state.signupSuccess = true
        },
        loginInitialize(state) {
            state.id = ''
            state.password = ''
            state.loginSuccess = null
        },
        loginSuccess(state, action) {
            state.token = action.payload.token
            state.loginSuccess = true
        },
        check(state, action) {
            state.token = action.payload
        },
        checkSuccess(state, action) {
            state.name = action.payload.name
            state.loginSuccess = true
        },
        checkFailure(state) {
            state.token = null
        },
        searchIdInitialize(state) {
            state.name = ''
            state.phoneNumber = ''
            state.searchIdSuccess = null
        },
        searchIdSuccess(state, action) {
            state.id = action.payload.username
            state.searchIdSuccess = true
        },
        searchIdFailure(state) {
            state.searchIdSuccess = false
        },
        searchPasswordInitialize(state) {
            state.name = ''
            state.phoneNumber = ''
            state.id = ''
            state.searchPasswordSuccess = null
        },
        searchPasswordSuccess(state, action) {
            state.password = action.payload.password
            state.searchPasswordSuccess = true
        },
        searchPasswordFailure(state) {
            state.searchPasswordSuccess = false
        },
        verifyInitialize(state) {
            state.password = ''
            state.verifySuccess = null
        },
        verifySuccess(state) {
            state.password = ''
            state.verifySuccess = true
        },
        getPersonalInformationSuccess(state, action) {
            state.name = action.payload.name,
            state.phoneNumber = action.payload.phone_number
        },
        modifyPasswordInitialize(state) {
            state.password = ''
            state.passwordCheck = ''
            state.modifyPasswordSuccess = null
        },
        modifyPasswordSuccess(state) {
            state.modifyPasswordSuccess = true
        },
        modifyPersonalInformationInitialize(state) {
            state.password = ''
            state.modifyPersonalInformationSuccess = null
            state.withdrawSuccess = null
        },
        modifyPersonalInformationSuccess(state) {
            state.modifyPersonalInformationSuccess = true
        },
        withdrawSuccess(state) {
            state.token = null
            state.loginSuccess = null,
            state.withdrawSuccess = true
        },
        withdrawFailure(state) {
            state.withdrawSuccess = false
        }
    }
});

const signupSaga = createRequestSaga(SIGNUP, WebAPI.signup);
const loginSaga = createRequestSaga(LOGIN, WebAPI.login);
const checkSaga = createRequestWithoutSnackbarSaga(CHECK, WebAPI.check);
const searchIdSaga = createRequestSaga(SEARCH_ID, WebAPI.searchId);
const searchPasswordSaga = createRequestWithoutSnackbarSaga(SEARCH_PASSWORD, WebAPI.searchPassword);
const verifySaga = createRequestSaga(VERIFY, WebAPI.verify);
const getPersonalInformationSaga = createRequestSaga(GET_PERSONAL_INFORMATION, WebAPI.getPersonalInformation);
const modifyPersonalInformationSaga = createRequestSaga(MODIFY_PERSONAL_INFORMATION, WebAPI.modifyPersonalInformation);
const modifyPasswordSaga = createRequestSaga(MODIFY_PASSWORD, WebAPI.modifyPassword);
const withdrawSaga = createRequestWithoutSnackbarSaga(WITHDRAW, WebAPI.withdraw);

function* loginSuccessSaga() {
    const token = yield select(state => state.user.token);

    try {
        AsyncStorage.setItem('token', token);
    } catch (e) {
        console.log('asyncStorage is not working');
    }

    yield put(check(token));
}

function removeTokenSaga() {
    try {
        AsyncStorage.removeItem('token');
    } catch (e) {
        console.log('asyncStorage is not working');
    }
}

function* modifyPersonalInformationSuccessSaga() {
    yield put(success());
    yield put(showSnackbar('개인 정보를 성공적으로 수정했습니다.'));
}

function* modifyPasswordSuccessSaga() {
    yield put(success());
    yield put(showSnackbar('비밀번호를 성공적으로 수정했습니다.'));
}

export function* userSaga() {
    yield takeLatest(userSlice.actions.signupInitialize, initializeSaga);
    yield takeLatest(userSlice.actions.loginInitialize, initializeSaga);
    yield takeLatest(userSlice.actions.searchIdInitialize, initializeSaga);
    yield takeLatest(userSlice.actions.searchPasswordInitialize, initializeSaga);
    yield takeLatest(userSlice.actions.verifyInitialize, initializeSaga);
    yield takeLatest(userSlice.actions.modifyPasswordInitialize, initializeSaga);
    yield takeLatest(userSlice.actions.modifyPersonalInformationInitialize, initializeSaga);
    yield takeLatest(SIGNUP, signupSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(userSlice.actions.loginSuccess, loginSuccessSaga);
    yield takeLatest(LOGOUT, removeTokenSaga);
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(SEARCH_ID, searchIdSaga);
    yield takeLatest(SEARCH_PASSWORD, searchPasswordSaga);
    yield takeLatest(VERIFY, verifySaga);
    yield takeLatest(GET_PERSONAL_INFORMATION, getPersonalInformationSaga);
    yield takeLatest(MODIFY_PERSONAL_INFORMATION, modifyPersonalInformationSaga);
    yield takeLatest(userSlice.actions.modifyPersonalInformationSuccess, modifyPersonalInformationSuccessSaga);
    yield takeLatest(MODIFY_PASSWORD, modifyPasswordSaga);
    yield takeLatest(userSlice.actions.modifyPasswordSuccess, modifyPasswordSuccessSaga);
    yield takeLatest(WITHDRAW, withdrawSaga);
    yield takeLatest(userSlice.actions.withdrawSuccess, removeTokenSaga);
}

export default userSlice.reducer;
export const {
    changeId,
    changePassword,
    changePasswordCheck,
    changeName,
    changePhoneNumber,
    signupInitialize,
    loginInitialize,
    checkSuccess,
    searchIdInitialize,
    searchPasswordInitialize,
    verifyInitialize,
    modifyPasswordInitialize,
    modifyPersonalInformationInitialize
} = userSlice.actions;