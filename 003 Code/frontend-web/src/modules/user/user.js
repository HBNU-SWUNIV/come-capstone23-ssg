import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/api/createRequestSaga';
import createRequestWithoutSnackbarSaga, { createRequesWithoutSnackbarActionTypes } from '../../lib/api/createRequestWithoutSnackbarSaga';
import * as WebAPI from '../../lib/api/webApi';
import { initializeSaga } from '../common';

const CHANGE_ID = 'user/CHANGE_ID';
const CHANGE_PASSWORD = 'user/CHANGE_PASSWORD';
const CHANGE_PASSWORD_CHECK = 'user/CHANGE_PASSWORD_CHECK';
const CHANGE_NAME = 'user/CHANGE_NAME';
const CHANGE_PHONE_NUMBER = 'user/CHANGE_PHONE_NUMBER';
const SIGNUP_INITIALIZE = 'user/SIGNUP_INITIALIZE';
const LOGIN_INITIALIZE = 'user/LOGIN_INITIALIZE';
const SEARCH_ID_INITIALIZE = 'user/SEARCH_ID_INITIALIZE';
const SEARCH_PASSWORD_INITIALIZE = 'user/SEARCH_PASSWORD_INITIALIZE';
const VERIFY_INITIALIZE = 'user/VERIFY_INITIALIZE';
const MODIFY_PASSWORD_INITIALIZE = 'user/MODIFY_PASSWORD_INITIALIZE';
const MODIFY_PERSONAL_INFORMATION_INITIALIZE = 'user/MODIFY_PERSONAL_INFORMATION_INITIALIZE';
const [SIGNUP, SIGNUP_SUCCESS] = createRequestActionTypes('user/SIGNUP');
const [LOGIN, LOGIN_SUCCESS] = createRequestActionTypes('user/LOGIN');
export const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequesWithoutSnackbarActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';
const [SEARCH_ID, SEARCH_ID_SUCCESS, SEARCH_ID_FAILURE] = createRequesWithoutSnackbarActionTypes('user/SEARCH_ID');
const [SEARCH_PASSWORD, SEARCH_PASSWORD_SUCCESS, SEARCH_PASSWORD_FAILURE] = createRequesWithoutSnackbarActionTypes('user/SEARCH_PASSWORD');
const [VERIFY, VERIFY_SUCCESS] = createRequestActionTypes('user/VERIFY');
const [MODIFY_PERSONAL_INFORMATION, MODIFY_PERSONAL_INFORMATION_SUCCESS] = createRequestActionTypes('user/MODIFY_PERSONAL_INFORMATION');
const [MODIFY_PASSWORD, MODIFY_PASSWORD_SUCCESS] = createRequestActionTypes('user/MODIFY_PASSWORD');
const [WITHDRAW, WITHDRAW_SUCCESS] = createRequestActionTypes('user/WITHDRAW');

export const changeId = createAction(CHANGE_ID, id => id);
export const changePassword = createAction(CHANGE_PASSWORD, password => password);
export const changePasswordCheck = createAction(CHANGE_PASSWORD_CHECK, passwordCheck => passwordCheck);
export const changeName = createAction(CHANGE_NAME, name => name);
export const changePhoneNumber = createAction(CHANGE_PHONE_NUMBER, phoneNumber => phoneNumber);
export const signupInitialize = createAction(SIGNUP_INITIALIZE);
export const loginInitialize = createAction(LOGIN_INITIALIZE);
export const searchIdInitialize = createAction(SEARCH_ID_INITIALIZE);
export const searchPasswordInitialize = createAction(SEARCH_PASSWORD_INITIALIZE);
export const verifyInitialize = createAction(VERIFY_INITIALIZE);
export const modifyPasswordInitialize = createAction(MODIFY_PASSWORD_INITIALIZE);
export const modifyPersonalInformationInitialize = createAction(MODIFY_PERSONAL_INFORMATION_INITIALIZE);
export const signup = createAction(SIGNUP);
export const login = createAction(LOGIN);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const searchId = createAction(SEARCH_ID);
export const searchPassword = createAction(SEARCH_PASSWORD);
export const verify = createAction(VERIFY, password => password);
export const modifyPersonalInformation = createAction(MODIFY_PERSONAL_INFORMATION);
export const modifyPassword = createAction(MODIFY_PASSWORD);
export const withdraw = createAction(WITHDRAW);

const signupSaga = createRequestSaga(SIGNUP, WebAPI.signup);
const loginSaga = createRequestSaga(LOGIN, WebAPI.login);
const checkSaga = createRequestWithoutSnackbarSaga(CHECK, WebAPI.check);
const searchIdSaga = createRequestWithoutSnackbarSaga(SEARCH_ID, WebAPI.searchId);
const searchPasswordSaga = createRequestWithoutSnackbarSaga(SEARCH_PASSWORD, WebAPI.searchPassword);
const verifySaga = createRequestSaga(VERIFY, WebAPI.verify);
const modifyPersonalInformationSaga = createRequestSaga(MODIFY_PERSONAL_INFORMATION, WebAPI.modifyPersonalInformation);
const modifyPasswordSaga = createRequestSaga(MODIFY_PASSWORD, WebAPI.modifyPassword);
const withdrawSaga = createRequestSaga(WITHDRAW, WebAPI.withdraw);

function removeTokenSaga() {
    try {
        localStorage.removeItem('token');
    } catch (e) {
        console.log('localStorage is not working');
    }
}

export function* userSaga() {
    yield takeLatest(SIGNUP_INITIALIZE, initializeSaga);
    yield takeLatest(LOGIN_INITIALIZE, initializeSaga);
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(VERIFY_INITIALIZE, initializeSaga);
    // yield takeLatest(MODIFY_PERSONAL_INFORMATION_INITIALIZE, );   // 사용자 정보 가져와서 초기화하기
    yield takeLatest(MODIFY_PASSWORD_INITIALIZE, initializeSaga);
    yield takeLatest(MODIFY_PERSONAL_INFORMATION_INITIALIZE, initializeSaga);
    yield takeLatest(SIGNUP, signupSaga);
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(SEARCH_ID, searchIdSaga);
    yield takeLatest(SEARCH_PASSWORD, searchPasswordSaga);
    yield takeLatest(VERIFY, verifySaga);
    yield takeLatest(MODIFY_PERSONAL_INFORMATION, modifyPersonalInformationSaga);
    yield takeLatest(MODIFY_PASSWORD, modifyPasswordSaga);
    yield takeLatest(WITHDRAW, withdrawSaga);
    yield takeLatest(WITHDRAW_SUCCESS, removeTokenSaga);
    yield takeLatest(LOGOUT, removeTokenSaga);
}

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

const user = handleActions(
    {
        [CHANGE_ID]: (state, { payload: id }) => ({
            ...state,
            id: id
        }),
        [CHANGE_PASSWORD]: (state, { payload: password }) => ({
            ...state,
            password: password
        }),
        [CHANGE_PASSWORD_CHECK]: (state, { payload: passwordCheck }) => ({
            ...state,
            passwordCheck: passwordCheck
        }),
        [CHANGE_NAME]: (state, { payload: name }) => ({
            ...state,
            name: name
        }),
        [CHANGE_PHONE_NUMBER]: (state, { payload: phoneNumber }) => ({
            ...state,
            phoneNumber: phoneNumber
        }),
        [LOGOUT]: (state) => ({
            ...state,
            token: null,
            id: '',
            password: '',
            passwordCheck: '',
            name: '',
            phoneNumber: ''
        }),
        [SIGNUP_INITIALIZE]: (state) => ({
            ...state,
            id: '',
            password: '',
            passwordCheck: '',
            name: '',
            phoneNumber: '',
            signupSuccess: null
        }),
        [SIGNUP_SUCCESS]: (state) => ({
            ...state,
            signupSuccess: true
        }),
        [LOGIN_INITIALIZE]: (state) => ({
            ...state,
            id: '',
            password: '',
            loginSuccess: null
        }),
        [SEARCH_ID_INITIALIZE]: (state) => ({
            ...state,
            name: '',
            phoneNumber: '',
            searchIdSuccess: null
        }),
        [SEARCH_PASSWORD_INITIALIZE]: (state) => ({
            ...state,
            name: '',
            phoneNumber: '',
            id: '',
            searchPasswordSuccess: null
        }),
        [LOGIN_SUCCESS]: (state, { payload: token }) => ({
            ...state,
            token: token.token,
            loginSuccess: true
        }),
        [CHECK]: (state, { payload: token }) => ({
            ...state,
            token: token
        }),
        [CHECK_SUCCESS]: (state) => ({
            ...state,
            loginSuccess: true
        }),
        [CHECK_FAILURE]: (state) => ({
            ...state,
            token: null
        }),
        [SEARCH_ID_SUCCESS]: (state, { payload }) => ({
            ...state,
            id: payload.user_id,
            searchIdSuccess: true
        }),
        [SEARCH_ID_FAILURE]: (state) => ({
            ...state,
            searchIdSuccess: false
        }),
        [SEARCH_PASSWORD_SUCCESS]: (state, { payload }) => ({
            ...state,
            password: payload.password,
            searchPasswordSuccess: true
        }),
        [SEARCH_PASSWORD_FAILURE]: (state) => ({
            ...state,
            searchPasswordSuccess: false
        }),
        [VERIFY_INITIALIZE]: (state) => ({
            ...state,
            password: '',
            verifySuccess: null
        }),
        [VERIFY_SUCCESS]: (state) => ({
            ...state,
            verifySuccess: true
        }),
        [MODIFY_PASSWORD_INITIALIZE]: (state) => ({
            ...state,
            password: '',
            passwordCheck: '',
            modifyPasswordSuccess: null
        }),
        [MODIFY_PASSWORD_SUCCESS]: (state) => ({
            ...state,
            modifyPasswordSuccess: true
        }),
        [MODIFY_PERSONAL_INFORMATION_INITIALIZE]: (state) => ({
            ...state,
            password: '',
            modifyPersonalInformationSuccess: null,
            withdrawSuccess: null
        }),
        [WITHDRAW_SUCCESS]: (state) => ({
            ...state,
            token: null,
            loginSuccess: null,
            withdrawSuccess: true
        }),
        [MODIFY_PERSONAL_INFORMATION_SUCCESS]: (state) => ({
            ...state,
            modifyPersonalInformationSuccess: true
        })
    },
    initialState
);

export default user;