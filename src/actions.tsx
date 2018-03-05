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

//export function* fetchData(term: string) {
//  try {
//    let results = yield select(getResults, term)
//    if (!results) {
//      const rawResults = yield call(Api.search, term)
//      const imageData = R.map(R.path(['images', 'downsized']),
//        rawResults.body.data);
//      results = {
//        responses: imageData,
//        search: term
//      }
//    }
//    yield put({
//      type: 'SEARCH_SUCCEEDED',
//      ...results
//    })
//  } catch (error) {
//    yield put({ type: 'SEARCH_FAILED' })
//  }
//}
//
//export function* fetchTrending() {
//  const rawResults = yield call(Api.trending)
//  const imageData = R.map(R.path(['images', 'downsized']),
//    rawResults.body.data);
//  yield put({
//    type: 'TRENDING_SUCCEEDED',
//    responses: imageData
//  })
//}

export function* fetchPatients() {
  const rawResults = yield call(Api.patients)
  yield put({
    type: 'FETCH_PATIENTS_SUCCEEDED',
    patients: rawResults.body
  })
}

export function* watchPatientsRequest() {
  yield takeEvery('FETCH_PATIENTS', fetchPatients)
}

export function* fetchPatient(id: number) {
  // run in parallel
  const [patient, appointments, userActions] = yield all([
    call(Api.patient, id),
    call(Api.appointmentsByPatient, id),
    call(Api.userActionsByPatient, id)
  ]);
  yield put({
    type: 'FETCH_PATIENT_SUCCEEDED',
    patient: patient.body,
    appointments: appointments.body,
    userActions: userActions.body
  })
}

export function* watchPatientRequest() {
  while (true) {
    const { id } = yield take('FETCH_PATIENT')
    yield fork(fetchPatient, id)
  }
}

//export function* watchSearchRequest() {
//  while (true) {
//    const { term } = yield take('SEARCH_REQUESTED')
//    yield fork(fetchData, term)
//  }
//}
//
//export function* watchTrendingRequest() {
//  yield takeEvery('TRENDING_REQUESTED', fetchTrending)
//}

export default function* rootSaga() {
  yield all([
    //fork(watchSearchRequest),
    //fork(watchTrendingRequest),
    fork(watchPatientsRequest),
    fork(watchPatientRequest)
  ])
}
