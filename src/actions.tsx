import { delay } from 'redux-saga';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import * as R from 'ramda';
import * as Api from './Api';


export function* helloSaga(): any {
  console.log('hello sagas')
}

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export function* fetchData() {
  try {
    const data = yield call(Api.trending)
    const imageData = R.map(R.path(['images', 'downsized']), data.body.data);
    yield put({ type: 'SEARCH_SUCCEEDED', data: imageData })
  } catch (error) {
    yield put({ type: 'SEARCH_FAILED' })
  }
}

export function* watchSearchRequest() {
  // takeLatest
  yield takeEvery('SEARCH_REQUESTED', fetchData)
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchSearchRequest()
  ])
}
