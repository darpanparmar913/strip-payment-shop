import { call, put, takeEvery } from 'redux-saga/effects';
import { ShowUserFailure, ShowUserSuccess } from "../UserAction/UserAction";

const fetchApi = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const movies = await response.json();
    return movies
}

function* fetchData() {
    try {
        const movies = yield call(fetchApi);
        yield put(ShowUserSuccess(movies));
    } catch (error) {
        yield put(ShowUserFailure(error))
    }
}

function* watchFetchData() {
    yield takeEvery('SHOW_USER_REQUEST', fetchData);
}

export default function* rootSaga() {
    yield watchFetchData();
}