import { delay } from 'redux-saga';
import { put, takeEvery, all } from 'redux-saga/effects';


export function* helloSaga(): any {
  console.log('hello sagas')
}

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export function* watchSearchRequest() {
  yield takeEvery('REQUEST_SEARCH', incrementAsync)
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchSearchRequest()
  ])
}
