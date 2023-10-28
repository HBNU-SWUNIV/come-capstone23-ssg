import { select, call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../../slices/loading';
import { showSnackbar } from '../../slices/common';

export default function createControlRequestSaga(type, request, key) {
    const success = `${type}Success`;
    const failure = `${type}Failure`;

    return function*(action) {
        yield put(startLoading(type));

        const datas = yield select(state => state[type.split('/', 1)[0]]);

        try {
            if (typeof(key) === 'string') {
                yield call(request, {
                    ...datas,
                    [key]: action.payload !== undefined ? action.payload : !datas[key]
                });
            } else {
                yield call(request, {
                    ...datas,
                    [key[0]]: {
                        ...[key[0]],
                        [key[1]]: action.payload
                    }
                })
            }
            yield put({
                type: success,
                payload: action.payload
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