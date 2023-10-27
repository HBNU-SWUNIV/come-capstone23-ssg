import { call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startLoading, finishLoading } from '../../slices/loading';
import { CHECK } from '../../slices/user/user';

export default function createRequestWithoutSnackbarSaga(type, request, key) {
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
            
            if (type === CHECK) {
                try {
                    AsyncStorage.removeItem('token');
                } catch (e) {
                    console.log('asyncStorage is not working');
                }
            }
        }

        yield put(finishLoading(type));
    }
}