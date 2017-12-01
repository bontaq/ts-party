import { put, select, take, fork, takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import * as R from 'ramda';
import * as Api from './Api';

import { getResults } from './selectors';

// quick rundown of the effect calls:
// - fork -- asyncronous / non-blocking call of fn
// - select -- includes passing the state, used here to see
//             if we already have results for a search
// - takeLatest -- cancels prior calls if it was still running
// - put -- dispatches to the store for updating
// - all -- somewhat like Promise.all,
//          those these promises don't finish

export function* fetchData(term: string) {
  try {
    let results = yield select(getResults, term)
    if (!results) {
      const rawResults = yield call(Api.search, term)
      const imageData = R.map(R.path(['images', 'downsized']),
        rawResults.body.data);
      results = {
        responses: imageData,
        search: term
      }
    }
    yield put({
      type: 'SEARCH_SUCCEEDED',
      ...results
    })
  } catch (error) {
    yield put({ type: 'SEARCH_FAILED' })
  }
}

export function* fetchTrending() {
  const rawResults = yield call(Api.trending)
  const imageData = R.map(R.path(['images', 'downsized']),
    rawResults.body.data);
  yield put({
    type: 'TRENDING_SUCCEEDED',
    responses: imageData
  })
}

export function* watchSearchRequest() {
  while (true) {
    const { term } = yield take('SEARCH_REQUESTED')
    yield fork(fetchData, term)
  }
}

export function* watchTrendingRequest() {
  yield takeEvery('TRENDING_REQUESTED', fetchTrending)
}

export default function* rootSaga() {
  yield all([
    fork(watchSearchRequest),
    fork(watchTrendingRequest)
  ])
}
