import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../../slices/loading';
import { showSnackbar } from '../../slices/common';

export default function createRequestSaga(type, request) {
    const success = `${type}Success`;
    const failure = `${type}Failure`;

    return function*(action) {
        yield put(startLoading(type));

        try {
            const response = yield call(request, action.payload);
            yield put({
                type: success,
                payload: response.data
            });
        } catch (e) {
            yield put({
                type: failure,
                payload: e,
                error: true
            });
            yield put(showSnackbar(e.response.data?.message === undefined ? '잠시 후 시도해주세요' : e.response.data.message));
        }

        yield put(finishLoading(type));
    }
}